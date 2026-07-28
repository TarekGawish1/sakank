import { PropertyType } from '@prisma/client';

export interface CreatePropertyDto {
  title: string;
  description: string;
  address: string;
  governorateId: string;
  cityId: string;
  areaId: string;
  latitude: number;
  longitude: number;
  propertyType: PropertyType;
  imageUrls: string[];
}

export interface PropertyResponse {
  id: string;
  title: string;
  description: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
    governorate: string;
    city: string;
    area: string;
  };
  propertyType: PropertyType;
  images: { id: string; url: string; displayOrder: number }[];
  createdAt: string;
}
