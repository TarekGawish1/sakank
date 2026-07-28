import { prisma } from '~/lib/prisma';
import { VerificationStatus } from '@prisma/client';

export const verificationRepository = {
  findLatestByUser: async (userId: string) => {
    return prisma.verificationRequest.findFirst({
      where: { userId, deletedAt: null },
      orderBy: { createdAt: 'desc' },
    });
  },

  findPendingByUser: async (userId: string) => {
    return prisma.verificationRequest.findFirst({
      where: {
        userId,
        status: 'PENDING',
        deletedAt: null,
      },
    });
  },

  create: async (userId: string) => {
    return prisma.verificationRequest.create({
      data: {
        userId,
        status: 'PENDING',
        submittedAt: new Date(),
      },
    });
  },

  findById: async (id: string) => {
    return prisma.verificationRequest.findFirst({
      where: { id, deletedAt: null },
      include: {
        user: true,
      },
    });
  },

  updateStatus: async (
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
    });
  },

  findAllPending: async (page: number, limit: number) => {
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
};
