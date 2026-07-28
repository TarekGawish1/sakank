import { prisma } from '~/lib/prisma';

export const notificationsRepository = {
  findByUser: async (userId: string, page: number, limit: number) => {
    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({
        where: { userId, deletedAt: null },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.notification.count({
        where: { userId, deletedAt: null },
      }),
    ]);
    return { notifications, total };
  },

  markAsRead: async (id: string, userId: string) => {
    return prisma.notification.updateMany({
      where: { id, userId, deletedAt: null },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
  },

  markAllAsRead: async (userId: string) => {
    return prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
        deletedAt: null,
      },
      data: {
        isRead: true,
        readAt: new Date(),
      },
    });
  },

  countUnread: async (userId: string) => {
    return prisma.notification.count({
      where: {
        userId,
        isRead: false,
        deletedAt: null,
      },
    });
  },

  findById: async (id: string) => {
    return prisma.notification.findFirst({
      where: { id, deletedAt: null },
    });
  },
};
