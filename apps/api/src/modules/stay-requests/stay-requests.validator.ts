import { z } from 'zod';

export const createStayRequestSchema = z.object({
  listingId: z.string().uuid(),
  message: z.string().max(500).optional(),
  moveInDate: z.string().datetime(),
  durationMonths: z.number().int().min(1).max(24),
});

export const stayRequestIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const stayRequestsQuerySchema = z.object({
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED', 'WITHDRAWN']).optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export const rejectRequestSchema = z.object({
  reason: z.string().max(500).optional(),
});

export type CreateStayRequestInput = z.infer<typeof createStayRequestSchema>;
export type StayRequestsQueryInput = z.infer<typeof stayRequestsQuerySchema>;
