import { Router } from 'express';
import { notificationsController } from './notifications.controller';
import { requireAuth } from '~/shared/middlewares/auth';
import { validate } from '~/shared/middlewares/validate';
import {
  notificationIdParamSchema,
  notificationsQuerySchema,
  registerTokenSchema,
  unregisterTokenSchema,
} from './notifications.validator';

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

// POST /api/v1/notifications/tokens — Register a device token for push notifications
router.post(
  '/tokens',
  validate({ body: registerTokenSchema }),
  notificationsController.registerDeviceToken,
);

// DELETE /api/v1/notifications/tokens/:token — Unregister a device token
router.delete(
  '/tokens/:token',
  validate({ params: unregisterTokenSchema }),
  notificationsController.unregisterDeviceToken,
);

export { router as notificationsRoutes };
