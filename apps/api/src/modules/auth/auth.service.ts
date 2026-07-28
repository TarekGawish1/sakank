import { getFirebaseAuth } from '~/lib/firebase';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '~/lib/jwt';
import { UnauthorizedError, ForbiddenError } from '~/shared/errors';
import { JwtPayload } from '~/shared/types';
import { authRepository } from './auth.repository';
import { AuthTokensResponse, RefreshResponse, MeResponse } from './auth.dto';
import { toMeResponse } from './auth.mapper';
import { logger } from '~/utils/logger';

export const authService = {
  /**
   * Verifies a Firebase token and either finds or creates the user.
   * Returns Sakank JWTs (access + refresh) and user info.
   */
  verifyOtpAndLogin: async (firebaseToken: string): Promise<AuthTokensResponse> => {
    // 1. Verify Firebase token
    let decodedToken;
    try {
      decodedToken = await getFirebaseAuth().verifyIdToken(firebaseToken);
    } catch (error) {
      logger.warn({ error }, 'Firebase token verification failed');
      throw new UnauthorizedError('Invalid Firebase token', 'AUTH_001');
    }

    const phone = decodedToken.phone_number;
    if (!phone) {
      throw new UnauthorizedError('Phone number not found in Firebase token', 'AUTH_001');
    }

    // 2. Find or create user
    let user = await authRepository.findUserByPhone(phone);
    let isNewUser = false;

    if (!user) {
      // New user — create with default STUDENT role
      user = await authRepository.createUser({
        phone,
        firstName: '',
        lastName: '',
        gender: 'MALE',
        role: 'STUDENT',
        phoneVerifiedAt: new Date(),
      });
      isNewUser = true;
    } else {
      // Check if user is blocked
      if (user.isBlocked) {
        throw new ForbiddenError('Your account has been suspended. Contact support.', 'AUTH_002');
      }
      if (!user.isActive) {
        throw new ForbiddenError('Your account is deactivated', 'AUTH_002');
      }
      // Update last login
      await authRepository.updateLastLogin(user.id);
    }

    // 3. Generate tokens
    const jwtPayload: JwtPayload = {
      userId: user.id,
      role: user.role,
    };

    const accessToken = generateAccessToken(jwtPayload);
    const refreshToken = generateRefreshToken(jwtPayload);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        isNewUser,
      },
    };
  },

  /**
   * Refreshes the access token using a valid refresh token.
   */
  refreshAccessToken: async (refreshToken: string): Promise<RefreshResponse> => {
    let payload: JwtPayload;
    try {
      payload = verifyRefreshToken(refreshToken);
    } catch {
      throw new UnauthorizedError('Invalid or expired refresh token', 'AUTH_001');
    }

    // Verify user still exists and is active
    const user = await authRepository.findUserById(payload.userId);
    if (!user || !user.isActive || user.isBlocked) {
      throw new UnauthorizedError('User account no longer active', 'AUTH_001');
    }

    const newAccessToken = generateAccessToken({
      userId: user.id,
      role: user.role,
    });

    return { accessToken: newAccessToken };
  },

  /**
   * Returns the current authenticated user's profile.
   */
  getMe: async (userId: string): Promise<MeResponse> => {
    const user = await authRepository.findUserById(userId);

    if (!user) {
      throw new UnauthorizedError('User not found', 'AUTH_001');
    }

    return toMeResponse(user);
  },
};
