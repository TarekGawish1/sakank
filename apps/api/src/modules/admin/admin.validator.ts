import { z } from 'zod';

export const adminVerificationsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export const adminVerificationIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const adminRejectVerificationSchema = z.object({
  reason: z.string().min(1, 'Rejection reason is required').max(500),
});

export const adminListingIdParamSchema = z.object({
  id: z.string().uuid(),
});

export type AdminVerificationsQueryInput = z.infer<typeof adminVerificationsQuerySchema>;
