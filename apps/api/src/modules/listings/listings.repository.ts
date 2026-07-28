import { prisma } from '~/lib/prisma';
import { Prisma, GenderRestriction, UnitType } from '@prisma/client';

// Shared include for listing queries to avoid N+1
const listingInclude = {
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
          images: { orderBy: { displayOrder: 'asc' as const } },
        },
      },
      images: { orderBy: { displayOrder: 'asc' as const } },
    },
  },
} satisfies Prisma.ListingInclude;

interface ListingFilters {
  cursor?: string;
  limit: number;
  gender?: string;
  minPrice?: number;
  maxPrice?: number;
  unitType?: string;
  governorateId?: string;
  cityId?: string;
  areaId?: string;
  search?: string;
  sort?: string;
}

export const listingsRepository = {
  findPublishedListings: async (filters: ListingFilters) => {
    const where: Prisma.ListingWhereInput = {
      status: 'PUBLISHED',
      deletedAt: null,
      unit: {
        deletedAt: null,
        availabilityStatus: 'AVAILABLE',
        ...(filters.gender && {
          genderRestriction: filters.gender as GenderRestriction,
        }),
        ...(filters.unitType && {
          unitType: filters.unitType as UnitType,
        }),
        ...(filters.minPrice !== undefined || filters.maxPrice !== undefined
          ? {
              monthlyRent: {
                ...(filters.minPrice !== undefined && { gte: filters.minPrice }),
                ...(filters.maxPrice !== undefined && { lte: filters.maxPrice }),
              },
            }
          : {}),
        property: {
          deletedAt: null,
          ...(filters.governorateId && { governorateId: filters.governorateId }),
          ...(filters.cityId && { cityId: filters.cityId }),
          ...(filters.areaId && { areaId: filters.areaId }),
        },
        ...(filters.search && {
          OR: [
            { title: { contains: filters.search, mode: 'insensitive' } },
            { description: { contains: filters.search, mode: 'insensitive' } },
          ],
        }),
      },
    };

    // Sorting
    let orderBy: Prisma.ListingOrderByWithRelationInput = { createdAt: 'desc' };
    if (filters.sort) {
      const isDesc = filters.sort.startsWith('-');
      const field = isDesc ? filters.sort.slice(1) : filters.sort;
      if (field === 'createdAt') {
        orderBy = { createdAt: isDesc ? 'desc' : 'asc' };
      } else if (field === 'monthlyRent') {
        orderBy = { unit: { monthlyRent: isDesc ? 'desc' : 'asc' } };
      }
    }

    // Cursor pagination
    if (filters.cursor) {
      return prisma.listing.findMany({
        where,
        include: listingInclude,
        orderBy,
        take: filters.limit + 1,
        cursor: { id: filters.cursor },
        skip: 1,
      });
    }

    return prisma.listing.findMany({
      where,
      include: listingInclude,
      orderBy,
      take: filters.limit + 1,
    });
  },

  findListingById: async (id: string) => {
    return prisma.listing.findFirst({
      where: { id, deletedAt: null },
      include: listingInclude,
    });
  },

  findRelatedListings: async (listingId: string, areaId: string) => {
    return prisma.listing.findMany({
      where: {
        id: { not: listingId },
        status: 'PUBLISHED',
        deletedAt: null,
        unit: {
          deletedAt: null,
          property: {
            areaId,
            deletedAt: null,
          },
        },
      },
      include: listingInclude,
      take: 3,
      orderBy: { createdAt: 'desc' },
    });
  },

  findFavorite: async (studentProfileId: string, listingId: string) => {
    return prisma.favorite.findUnique({
      where: {
        uq_favorite_student_listing: {
          studentProfileId,
          listingId,
        },
      },
    });
  },

  createFavorite: async (studentProfileId: string, listingId: string) => {
    return prisma.favorite.create({
      data: { studentProfileId, listingId },
    });
  },

  deleteFavorite: async (studentProfileId: string, listingId: string) => {
    return prisma.favorite.delete({
      where: {
        uq_favorite_student_listing: {
          studentProfileId,
          listingId,
        },
      },
    });
  },

  findFavoritesByStudent: async (studentProfileId: string, page: number, limit: number) => {
    const [favorites, total] = await Promise.all([
      prisma.favorite.findMany({
        where: { studentProfileId, deletedAt: null },
        include: {
          listing: {
            include: listingInclude,
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.favorite.count({
        where: { studentProfileId, deletedAt: null },
      }),
    ]);

    return { favorites, total };
  },

  getStudentProfileId: async (userId: string) => {
    const profile = await prisma.studentProfile.findUnique({
      where: { userId },
      select: { id: true },
    });
    return profile?.id || null;
  },
};
