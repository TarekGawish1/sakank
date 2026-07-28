import { NotFoundError, ForbiddenError } from '~/shared/errors';
import { PaginationMeta } from '~/shared/types';
import { notificationsRepository } from './notifications.repository';
import { NotificationResponse, UnreadCountResponse } from './notifications.dto';
import { toNotificationResponse } from './notifications.mapper';

export const notificationsService = {
  /**
   * Lists paginated notifications for a user.
   */
  listNotifications: async (
    userId: string,
    page: number,
    limit: number,
  ): Promise<{ items: NotificationResponse[]; meta: PaginationMeta }> => {
    const { notifications, total } = await notificationsRepository.findByUser(userId, page, limit);

    return {
      items: notifications.map(toNotificationResponse),
      meta: { page, limit, total },
    };
  },

  /**
   * Marks a single notification as read.
   */
  markAsRead: async (notificationId: string, userId: string): Promise<void> => {
    const notification = await notificationsRepository.findById(notificationId);
    if (!notification) {
      throw new NotFoundError('Notification');
    }

    if (notification.userId !== userId) {
      throw new ForbiddenError('You cannot mark this notification as read');
    }

    await notificationsRepository.markAsRead(notificationId, userId);
  },

  /**
   * Marks all notifications as read for a user.
   */
  markAllAsRead: async (userId: string): Promise<void> => {
    await notificationsRepository.markAllAsRead(userId);
  },

  /**
   * Returns the count of unread notifications.
   */
  getUnreadCount: async (userId: string): Promise<UnreadCountResponse> => {
    const count = await notificationsRepository.countUnread(userId);
    return { count };
  },
};
