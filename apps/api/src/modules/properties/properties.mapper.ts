import { Property, Governorate, City, Area, PropertyImage } from '@prisma/client';
import { PropertyResponse } from './properties.dto';
import { sanitizeText } from '~/shared/utils/sanitize';

type PropertyWithRelations = Property & {
  governorate: Governorate;
  city: City;
  area: Area;
  images: PropertyImage[];
};

export const toPropertyResponse = (property: PropertyWithRelations): PropertyResponse => {
  return {
    id: property.id,
    title: sanitizeText(property.title),
    description: sanitizeText(property.description),
    address: sanitizeText(property.address),
    location: {
      latitude: Number(property.latitude),
      longitude: Number(property.longitude),
      governorate: property.governorate.name,
      city: property.city.name,
      area: property.area.name,
    },
    propertyType: property.propertyType,
    images: property.images
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((img) => ({
        id: img.id,
        url: img.url,
        displayOrder: img.displayOrder,
      })),
    createdAt: property.createdAt.toISOString(),
  };
};
