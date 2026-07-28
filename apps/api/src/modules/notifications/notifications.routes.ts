import { Router } from 'express';
import { notificationsController } from './notifications.controller';
import { requireAuth } from '~/shared/middlewares/auth';
import { validate } from '~/shared/middlewares/validate';
import { notificationIdParamSchema, notificationsQuerySchema } from './notifications.validator';

const router = Router();

// All notification routes require authentication
router.use(requireAuth);

// GET /api/v1/notifications — List paginated notifications
router.get(
  '/',
  validate({ query: notificationsQuerySchema }),
  notificationsController.list,
);

// GET /api/v1/notifications/unread — Get unread count
router.get('/unread', notificationsController.getUnreadCount);

// PATCH /api/v1/notifications/read-all — Mark all as read
router.patch('/read-all', notificationsController.markAllAsRead);

// PATCH /api/v1/notifications/:id/read — Mark single as read
router.patch(
  '/:id/read',
  validate({ params: notificationIdParamSchema }),
  notificationsController.markAsRead,
);

export { router as notificationsRoutes };
