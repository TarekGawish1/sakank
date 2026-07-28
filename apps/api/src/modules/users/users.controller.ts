import { Request, Response, NextFunction } from 'express';
import { usersService } from './users.service';
import { sendSuccess } from '~/shared/utils/response';

export const usersController = {
  updateStudentProfile: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      const result = await usersService.updateStudentProfile(userId, req.body);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  generateAvatarUploadUrl: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // TODO: Integrate with Cloudflare R2 presigned URL generation
      // For now, return a placeholder response
      return sendSuccess(res, {
        uploadUrl: 'https://placeholder.r2.dev/upload',
        publicUrl: 'https://placeholder.r2.dev/avatars/placeholder.jpg',
        message: 'Cloudflare R2 integration pending',
      });
    } catch (error) {
      next(error);
    }
  },

  listUniversities: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await usersService.listUniversities();
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },
};
