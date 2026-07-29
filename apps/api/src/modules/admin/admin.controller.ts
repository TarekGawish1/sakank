import { Request, Response, NextFunction } from 'express';
import { adminService } from './admin.service';
import { sendSuccess } from '~/shared/utils/response';

export const adminController = {
  getStats: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const stats = await adminService.getStats();
      return sendSuccess(res, stats);
    } catch (error) {
      next(error);
    }
  },

  listUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const search = req.query.search ? String(req.query.search) : undefined;
      const { items, meta } = await adminService.listUsers(page, limit, search);
      return sendSuccess(res, items, meta);
    } catch (error) {
      next(error);
    }
  },

  listProperties: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      const search = req.query.search ? String(req.query.search) : undefined;
      const { items, meta } = await adminService.listProperties(page, limit, search);
      return sendSuccess(res, items, meta);
    } catch (error) {
      next(error);
    }
  },

  blockUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await adminService.blockUser(req.params.id);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { firstName, lastName, role } = req.body;
      const result = await adminService.updateUser(req.params.id, { firstName, lastName, role });
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  deleteProperty: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await adminService.deleteProperty(req.params.id);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  updateProperty: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title } = req.body;
      const result = await adminService.updatePropertyTitle(req.params.id, title);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

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
