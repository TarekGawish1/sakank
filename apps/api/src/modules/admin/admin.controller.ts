import { Request, Response, NextFunction } from 'express';
import { adminService } from './admin.service';
import { sendSuccess } from '~/shared/utils/response';

export const adminController = {
  listPendingVerifications: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const { items, meta } = await adminService.listPendingVerifications(page, limit);
      return sendSuccess(res, items, meta);
    } catch (error) {
      next(error);
    }
  },

  approveVerification: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminUserId = req.user!.userId;
      const result = await adminService.approveVerification(req.params.id, adminUserId);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  rejectVerification: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminUserId = req.user!.userId;
      const { reason } = req.body;
      const result = await adminService.rejectVerification(req.params.id, adminUserId, reason);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  hideListing: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await adminService.hideListing(req.params.id);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },
};
