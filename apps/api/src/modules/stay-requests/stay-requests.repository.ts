import { prisma } from '~/lib/prisma';
import { Prisma, StayRequestStatus } from '@prisma/client';

// Shared include for stay request queries
const stayRequestInclude = {
  listing: {
    include: {
      unit: {
        include: {
          property: {
            include: {
              governorate: true,
              city: true,
              area: true,
              ownerProfile: {
                include: {
                  user: true,
                },
              },
            },
          },
          images: { orderBy: { displayOrder: 'asc' as const } },
        },
      },
    },
  },
  studentProfile: {
    include: {
      user: true,
    },
  },
} satisfies Prisma.StayRequestInclude;

export const stayRequestsRepository = {
  create: async (data: {
    listingId: string;
    studentProfileId: string;
    message?: string;
    moveInDate: Date;
    durationMonths: number;
  }) => {
    return prisma.stayRequest.create({
      data: {
        listingId: data.listingId,
        studentProfileId: data.studentProfileId,
        message: data.message,
        moveInDate: data.moveInDate,
        durationMonths: data.durationMonths,
        status: 'PENDING',
      },
      include: stayRequestInclude,
    });
  },

  findById: async (id: string) => {
    return prisma.stayRequest.findFirst({
      where: { id, deletedAt: null },
      include: stayRequestInclude,
    });
  },

  findByStudentAndListing: async (studentProfileId: string, listingId: string) => {
    return prisma.stayRequest.findFirst({
      where: {
        studentProfileId,
        listingId,
        status: { in: ['PENDING', 'APPROVED'] },
        deletedAt: null,
      },
    });
  },

  findByUser: async (
    userId: string,
    role: string,
    status: StayRequestStatus | undefined,
    page: number,
    limit: number,
  ) => {
    let where: Prisma.StayRequestWhereInput = { deletedAt: null };

    if (role === 'STUDENT') {
      where.studentProfile = { userId };
    } else if (role === 'OWNER') {
      where.listing = {
        unit: {
          property: {
            ownerProfile: { userId },
          },
        },
      };
    }

    if (status) {
      where.status = status;
    }

    const [requests, total] = await Promise.all([
      prisma.stayRequest.findMany({
        where,
        include: stayRequestInclude,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.stayRequest.count({ where }),
    ]);

    return { requests, total };
  },

  updateStatus: async (
    id: string,
    status: StayRequestStatus,
    ownerResponse?: string,
  ) => {
    return prisma.stayRequest.update({
      where: { id },
      data: {
        status,
        ownerResponse,
        respondedAt: new Date(),
      },
      include: stayRequestInclude,
    });
  },

  getStudentProfileId: async (userId: string) => {
    const profile = await prisma.studentProfile.findUnique({
      where: { userId },
      select: { id: true },
    });
    return profile?.id || null;
  },
};
