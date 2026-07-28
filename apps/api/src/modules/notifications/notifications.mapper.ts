import { Notification } from '@prisma/client';
import { NotificationResponse } from './notifications.dto';
import { sanitizeText } from '~/shared/utils/sanitize';

export const toNotificationResponse = (notification: Notification): NotificationResponse => {
  return {
    id: notification.id,
    type: notification.type,
    title: sanitizeText(notification.title),
    body: sanitizeText(notification.body),
    isRead: notification.isRead,
    readAt: notification.readAt?.toISOString() || null,
    referenceId: notification.referenceId || null,
    createdAt: notification.createdAt.toISOString(),
  };
};
