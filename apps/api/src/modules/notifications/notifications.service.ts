import { NotFoundError, ForbiddenError } from '~/shared/errors';
import { PaginationMeta } from '~/shared/types';
import { notificationsRepository } from './notifications.repository';
import { NotificationResponse, UnreadCountResponse } from './notifications.dto';
import { toNotificationResponse } from './notifications.mapper';
import { sendMulticastNotification } from '~/lib/firebase';
import { prisma } from '~/lib/prisma';
import { NotificationType } from '@prisma/client';

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

  // --- Device Tokens ---

  registerDeviceToken: async (userId: string, token: string): Promise<void> => {
    await notificationsRepository.registerDeviceToken(userId, token);
  },

  unregisterDeviceToken: async (userId: string, token: string): Promise<void> => {
    await notificationsRepository.unregisterDeviceToken(userId, token);
  },

  // --- Creation & Push Notification ---

  /**
   * Creates an in-app notification and simultaneously sends a Push Notification via Firebase.
   */
  createNotification: async (
    userId: string,
    type: NotificationType,
    title: string,
    body: string,
    referenceId?: string
  ): Promise<void> => {
    // 1. Create In-App Notification
    await prisma.notification.create({
      data: {
        userId,
        type,
        title,
        body,
        referenceId,
      },
    });

    // 2. Fetch User's Device Tokens
    const tokens = await notificationsRepository.getUserTokens(userId);

    // 3. Send Push Notification if tokens exist
    if (tokens.length > 0) {
      await sendMulticastNotification(tokens, title, body, {
        type,
        referenceId: referenceId || '',
      });
    }
  },
};
