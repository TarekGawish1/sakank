import { prisma } from '~/lib/prisma';
import { VerificationStatus } from '@prisma/client';

export const adminRepository = {
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
