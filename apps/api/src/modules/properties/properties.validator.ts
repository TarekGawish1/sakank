import { z } from 'zod';
import { PropertyType } from '@prisma/client';

export const createPropertySchema = z.object({
  title: z.string().min(5).max(100),
  description: z.string().min(10).max(1000),
  address: z.string().min(5).max(200),
  governorateId: z.string().uuid(),
  cityId: z.string().uuid(),
  areaId: z.string().uuid(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  propertyType: z.nativeEnum(PropertyType),
  imageUrls: z.array(z.string().url()).min(1).max(10), // Expecting R2 URLs
});

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;
