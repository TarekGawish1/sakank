import { Router } from 'express';
import { verificationController } from './verification.controller';
import { requireAuth } from '~/shared/middlewares/auth';
import { validate } from '~/shared/middlewares/validate';
import { submitVerificationSchema } from './verification.validator';

const router = Router();

// POST /api/v1/verification — Submit national ID for verification
router.post(
  '/',
  requireAuth,
  validate({ body: submitVerificationSchema }),
  verificationController.submit,
);

// GET /api/v1/verification/status — Get current verification status
router.get('/status', requireAuth, verificationController.getStatus);

export { router as verificationRoutes };
