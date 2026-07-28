import { Router } from 'express';
import { authController } from './auth.controller';
import { requireAuth } from '~/shared/middlewares/auth';
import { validate } from '~/shared/middlewares/validate';
import { verifyOtpSchema, refreshTokenSchema } from './auth.validator';

const router = Router();

// POST /api/v1/auth/otp/verify — Exchange Firebase token for Sakank JWTs
router.post(
  '/otp/verify',
  validate({ body: verifyOtpSchema }),
  authController.verifyOtp,
);

// POST /api/v1/auth/refresh — Issue new access token
router.post(
  '/refresh',
  validate({ body: refreshTokenSchema }),
  authController.refresh,
);

// POST /api/v1/auth/logout — Invalidate refresh token (client-side)
router.post('/logout', requireAuth, authController.logout);

// GET /api/v1/auth/me — Get current user profile
router.get('/me', requireAuth, authController.me);

export { router as authRoutes };
