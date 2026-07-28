import { Request, Response, NextFunction } from 'express';
import { verificationService } from './verification.service';
import { sendSuccess, sendCreated } from '~/shared/utils/response';

export const verificationController = {
  submit: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      const result = await verificationService.submitVerification(userId);
      return sendCreated(res, result);
    } catch (error) {
      next(error);
    }
  },

  getStatus: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      const result = await verificationService.getVerificationStatus(userId);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },
};
