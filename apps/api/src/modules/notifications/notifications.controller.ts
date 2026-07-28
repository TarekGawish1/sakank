import { Request, Response, NextFunction } from 'express';
import { notificationsService } from './notifications.service';
import { sendSuccess } from '~/shared/utils/response';

export const notificationsController = {
  list: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const { items, meta } = await notificationsService.listNotifications(userId, page, limit);
      return sendSuccess(res, items, meta);
    } catch (error) {
      next(error);
    }
  },

  markAsRead: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      await notificationsService.markAsRead(req.params.id, userId);
      return sendSuccess(res, { message: 'Notification marked as read' });
    } catch (error) {
      next(error);
    }
  },

  markAllAsRead: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      await notificationsService.markAllAsRead(userId);
      return sendSuccess(res, { message: 'All notifications marked as read' });
    } catch (error) {
      next(error);
    }
  },

  getUnreadCount: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      const result = await notificationsService.getUnreadCount(userId);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },
};
