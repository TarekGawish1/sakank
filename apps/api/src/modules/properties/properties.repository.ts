import { prisma } from '~/lib/prisma';
import { CreatePropertyDto } from './properties.dto';

const propertyInclude = {
  governorate: true,
  city: true,
  area: true,
  images: { orderBy: { displayOrder: 'asc' as const } },
};

export const propertiesRepository = {
  getOwnerProfileId: async (userId: string) => {
    const profile = await prisma.ownerProfile.findUnique({
      where: { userId },
      select: { id: true },
    });
    return profile?.id || null;
  },

  getLocationNames: async (governorateId: string, cityId: string) => {
    const [gov, city] = await Promise.all([
      prisma.governorate.findUnique({ where: { id: governorateId } }),
      prisma.city.findUnique({ where: { id: cityId } }),
    ]);
    return {
      governorateName: gov?.name || null,
      cityName: city?.name || null,
    };
  },

  createProperty: async (ownerProfileId: string, dto: CreatePropertyDto) => {
    return prisma.property.create({
      data: {
        ownerProfileId,
        title: dto.title,
        description: dto.description,
        address: dto.address,
        latitude: dto.latitude,
        longitude: dto.longitude,
        propertyType: dto.propertyType,
        governorateId: dto.governorateId,
        cityId: dto.cityId,
        areaId: dto.areaId,
        images: {
          create: dto.imageUrls.map((url, index) => ({
            url,
            displayOrder: index,
            isPrimary: index === 0,
          })),
        },
      },
      include: propertyInclude,
    });
  },
};
