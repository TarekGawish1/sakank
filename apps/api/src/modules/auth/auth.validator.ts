import { z } from 'zod';

export const verifyOtpSchema = z.object({
  firebaseToken: z.string().min(1, 'Firebase token is required'),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
