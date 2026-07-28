import { z } from 'zod';

export const listingsQuerySchema = z.object({
  cursor: z.string().uuid().optional(),
  limit: z.coerce.number().int().min(1).max(50).default(20),
  gender: z.enum(['MALE', 'FEMALE', 'MIXED']).optional(),
  minPrice: z.coerce.number().min(0).optional(),
  maxPrice: z.coerce.number().min(0).optional(),
  amenities: z.string().optional(), // comma-separated
  unitType: z.enum(['APARTMENT', 'ROOM', 'BED', 'STUDIO']).optional(),
  governorateId: z.string().uuid().optional(),
  cityId: z.string().uuid().optional(),
  areaId: z.string().uuid().optional(),
  search: z.string().optional(), // Text search for title/description
  sort: z.string().optional(), // e.g., '-createdAt', 'monthlyRent'
});

export const listingIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const favoriteParamSchema = z.object({
  listingId: z.string().uuid(),
});

export const favoritesQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export type ListingsQueryInput = z.infer<typeof listingsQuerySchema>;
export type FavoritesQueryInput = z.infer<typeof favoritesQuerySchema>;
