import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';
import { sendSuccess, sendCreated } from '~/shared/utils/response';

export const authController = {
  verifyOtp: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { firebaseToken } = req.body;
      const result = await authService.verifyOtpAndLogin(firebaseToken);

      if (result.user.isNewUser) {
        return sendCreated(res, result);
      }
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  refresh: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      const result = await authService.refreshAccessToken(refreshToken);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  logout: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      // Stateless JWT — logout is handled client-side by deleting tokens
      // Future: If using Redis token blacklist, invalidate here
      return sendSuccess(res, { message: 'Logged out successfully' });
    } catch (error) {
      next(error);
    }
  },

  me: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      const result = await authService.getMe(userId);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },
};
