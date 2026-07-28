import { z } from 'zod';
import { UserRole } from '@prisma/client';

export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  phone: z.string().min(10).max(20),
  gender: z.enum(['MALE', 'FEMALE']),
  role: z.enum([UserRole.STUDENT, UserRole.OWNER]),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const verifyEmailSchema = z.object({
  token: z.string(),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string(),
});

export const logoutSchema = z.object({
  refreshToken: z.string(),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
