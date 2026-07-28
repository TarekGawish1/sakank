import { z } from 'zod';

export const updateStudentProfileSchema = z.object({
  firstName: z.string().min(2).max(50).optional(),
  lastName: z.string().min(2).max(50).optional(),
  gender: z.enum(['MALE', 'FEMALE']).optional(),
  universityId: z.string().uuid().optional(),
  faculty: z.string().max(100).optional(),
  academicYear: z.string().max(20).optional(),
});

export const avatarUploadSchema = z.object({
  contentType: z
    .string()
    .refine(
      (val) => ['image/jpeg', 'image/png', 'image/webp'].includes(val),
      'Only JPEG, PNG, and WebP images are allowed',
    ),
  fileName: z.string().min(1),
});

export type UpdateStudentProfileInput = z.infer<typeof updateStudentProfileSchema>;
export type AvatarUploadInput = z.infer<typeof avatarUploadSchema>;
