import { z } from 'zod';

export const notificationIdParamSchema = z.object({
  id: z.string().uuid(),
});

export const notificationsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

export type NotificationsQueryInput = z.infer<typeof notificationsQuerySchema>;
