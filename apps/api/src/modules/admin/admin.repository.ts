import { prisma } from '~/lib/prisma';
import { VerificationStatus, UserRole } from '@prisma/client';

export const adminRepository = {
  getStats: async () => {
    const [totalUsers, activeProperties, activeListings, propertyTypesRaw, usersByMonth] = await Promise.all([
      prisma.user.count({ where: { deletedAt: null } }),
      prisma.property.count({ where: { deletedAt: null } }),
      prisma.listing.count({ where: { status: 'PUBLISHED', deletedAt: null } }),
      prisma.property.groupBy({
        by: ['propertyType'],
        _count: { id: true },
        where: { deletedAt: null },
      }),
      prisma.user.findMany({
        where: { deletedAt: null },
        select: { createdAt: true },
        orderBy: { createdAt: 'asc' },
      }),
    ]);

    const propertyDistribution = propertyTypesRaw.map((pt) => ({
      name: pt.propertyType,
      count: pt._count.id,
    }));

    // Group user growth by month name in Arabic
    const monthsAr = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
    const monthCounts: Record<string, number> = {};

    usersByMonth.forEach((u) => {
      const monthName = monthsAr[new Date(u.createdAt).getMonth()];
      monthCounts[monthName] = (monthCounts[monthName] || 0) + 1;
    });

    const userGrowth = Object.entries(monthCounts).map(([name, users]) => ({ name, users }));

    return {
      totalUsers,
      activeProperties,
      activeListings,
      propertyDistribution,
      userGrowth: userGrowth.length > 0 ? userGrowth : [{ name: monthsAr[new Date().getMonth()], users: totalUsers }],
    };
  },

  findUsers: async (page: number, limit: number, search?: string) => {
    const where: any = { deletedAt: null };
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where }),
    ]);

    return { users, total };
  },

  findProperties: async (page: number, limit: number, search?: string) => {
    const where: any = { deletedAt: null };
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        include: {
          governorate: true,
          city: true,
          area: true,
          ownerProfile: { include: { user: true } },
          images: { where: { isPrimary: true }, take: 1 },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.property.count({ where }),
    ]);

    return { properties, total };
  },

  toggleBlockUser: async (userId: string) => {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return null;

    // Toggle deletedAt as pseudo-block flag or return updated user
    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        // If already soft deleted / blocked, restore; otherwise soft delete
        deletedAt: user.deletedAt ? null : new Date(),
      },
    });
    return updated;
  },

  deleteProperty: async (id: string) => {
    return prisma.property.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  },

  findPendingVerifications: async (page: number, limit: number) => {
    const [requests, total] = await Promise.all([
      prisma.verificationRequest.findMany({
        where: { status: 'PENDING', deletedAt: null },
        include: { user: true },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { submittedAt: 'asc' },
      }),
      prisma.verificationRequest.count({
        where: { status: 'PENDING', deletedAt: null },
      }),
    ]);
    return { requests, total };
  },

  findVerificationById: async (id: string) => {
    return prisma.verificationRequest.findFirst({
      where: { id, deletedAt: null },
      include: { user: true },
    });
  },

  updateVerificationStatus: async (
    id: string,
    status: VerificationStatus,
    reviewedById: string,
    reviewNotes?: string,
  ) => {
    return prisma.verificationRequest.update({
      where: { id },
      data: {
        status,
        reviewedById,
        reviewedAt: new Date(),
        reviewNotes,
      },
      include: { user: true },
    });
  },

  findListingById: async (id: string) => {
    return prisma.listing.findFirst({
      where: { id, deletedAt: null },
    });
  },

  hideListing: async (id: string) => {
    return prisma.listing.update({
      where: { id },
      data: {
        status: 'ARCHIVED',
        unpublishedAt: new Date(),
      },
    });
  },
};
