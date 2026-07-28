import { Request, Response, NextFunction } from 'express';
import { stayRequestsService } from './stay-requests.service';
import { sendSuccess, sendCreated } from '~/shared/utils/response';

export const stayRequestsController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      const result = await stayRequestsService.createRequest(userId, req.body);
      return sendCreated(res, result);
    } catch (error) {
      next(error);
    }
  },

  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      const role = req.user!.role;
      const { items, meta } = await stayRequestsService.listRequests(userId, role, req.query as never);
      return sendSuccess(res, items, meta);
    } catch (error) {
      next(error);
    }
  },

  getById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      const result = await stayRequestsService.getRequestDetail(req.params.id, userId);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  accept: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      const result = await stayRequestsService.acceptRequest(req.params.id, userId);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  reject: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      const reason = req.body?.reason;
      const result = await stayRequestsService.rejectRequest(req.params.id, userId, reason);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  cancel: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      const result = await stayRequestsService.cancelRequest(req.params.id, userId);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },
};
