import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '~/lib/jwt';
import { UnauthorizedError, BadRequestError, ConflictError } from '~/shared/errors';
import { JwtPayload } from '~/shared/types';
import { authRepository } from './auth.repository';
import { emailService } from '~/shared/services/email.service';
import { SignupInput, LoginInput } from './auth.validator';
import { AuthTokensResponse, RefreshResponse, MeResponse } from './auth.dto';
import { toMeResponse } from './auth.mapper';
import { logger } from '~/utils/logger';

export const authService = {
  /**
   * Registers a new user, hashes password, and sends verification email.
   */
  signup: async (data: SignupInput): Promise<{ message: string }> => {
    // Check if email or phone already exists
    const [existingEmail, existingPhone] = await Promise.all([
      authRepository.findUserByEmail(data.email),
      authRepository.findUserByPhone(data.phone),
    ]);

    if (existingEmail) throw new ConflictError('البريد الإلكتروني مسجل مسبقاً', 'AUTH_002');
    if (existingPhone) throw new ConflictError('رقم الهاتف مسجل مسبقاً', 'AUTH_003');

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 12);

    // Generate Verification Token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create User
    const user = await authRepository.createUser(data, hashedPassword, verificationToken);

    // Send Verification Email
    await emailService.sendVerificationEmail(user.email, verificationToken);

    return { message: 'تم إنشاء الحساب بنجاح. يرجى مراجعة بريدك الإلكتروني لتفعيله.' };
  },

  /**
   * Authenticates a user using email and password.
   */
  login: async (data: LoginInput): Promise<AuthTokensResponse> => {
    const user = await authRepository.findUserByEmail(data.email);

    if (!user) {
      throw new UnauthorizedError('البريد الإلكتروني أو كلمة المرور غير صحيحة', 'AUTH_004');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedError('البريد الإلكتروني أو كلمة المرور غير صحيحة', 'AUTH_004');
    }

    if (!user.emailVerifiedAt) {
      throw new UnauthorizedError('يرجى تفعيل بريدك الإلكتروني أولاً', 'AUTH_005');
    }

    if (user.isBlocked) {
      throw new UnauthorizedError('هذا الحساب محظور. يرجى التواصل مع الإدارة.', 'AUTH_006');
    }

    // Generate Tokens
    const payload: JwtPayload = { userId: user.id, role: user.role };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await authRepository.updateUserLastLogin(user.id);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        role: user.role,
        isCompleted: !!(user.studentProfile || user.ownerProfile),
      },
    };
  },

  /**
   * Verifies the email address using the token.
   */
  verifyEmail: async (token: string): Promise<{ message: string }> => {
    const user = await authRepository.findUserByVerificationToken(token);

    if (!user) {
      throw new BadRequestError('رابط التفعيل غير صالح أو منتهي الصلاحية', 'AUTH_007');
    }

    await authRepository.markEmailAsVerified(user.id);

    return { message: 'تم تفعيل البريد الإلكتروني بنجاح. يمكنك تسجيل الدخول الآن.' };
  },

  /**
   * Refreshes the access token using a valid refresh token.
   */
  refresh: async (token: string): Promise<RefreshResponse> => {
    const payload = verifyRefreshToken(token);
    const user = await authRepository.findUserById(payload.userId);

    if (!user || user.isBlocked) {
      throw new UnauthorizedError('Invalid or revoked token', 'AUTH_002');
    }

    const newAccessToken = generateAccessToken({ userId: user.id, role: user.role });
    return { accessToken: newAccessToken };
  },

  /**
   * Logs out the user (In a real scenario, we would blacklist the refresh token).
   */
  logout: async (refreshToken: string): Promise<void> => {
    verifyRefreshToken(refreshToken);
    // TODO: Blacklist the refresh token in Redis or Database
    logger.info('User logged out successfully');
  },

  /**
   * Gets the current user's profile details.
   */
  getMe: async (userId: string): Promise<MeResponse> => {
    const user = await authRepository.findUserById(userId);
    if (!user) {
      throw new UnauthorizedError('User not found');
    }
    return toMeResponse(user);
  },
};
