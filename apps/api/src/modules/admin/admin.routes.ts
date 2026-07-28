import { Router } from 'express';
import { adminController } from './admin.controller';
import { requireAuth } from '~/shared/middlewares/auth';
import { requireRole } from '~/shared/middlewares/requireRole';
import { validate } from '~/shared/middlewares/validate';
import {
  adminVerificationsQuerySchema,
  adminVerificationIdParamSchema,
  adminRejectVerificationSchema,
  adminListingIdParamSchema,
} from './admin.validator';

const router = Router();

// All admin routes require ADMIN role
router.use(requireAuth, requireRole(['ADMIN']));

// GET /api/v1/admin/verifications — List pending verifications
router.get(
  '/verifications',
  validate({ query: adminVerificationsQuerySchema }),
  adminController.listPendingVerifications,
);

// POST /api/v1/admin/verifications/:id/approve — Approve verification
router.post(
  '/verifications/:id/approve',
  validate({ params: adminVerificationIdParamSchema }),
  adminController.approveVerification,
);

// POST /api/v1/admin/verifications/:id/reject — Reject verification
router.post(
  '/verifications/:id/reject',
  validate({
    params: adminVerificationIdParamSchema,
    body: adminRejectVerificationSchema,
  }),
  adminController.rejectVerification,
);

// POST /api/v1/admin/listings/:id/hide — Force-hide a listing
router.post(
  '/listings/:id/hide',
  validate({ params: adminListingIdParamSchema }),
  adminController.hideListing,
);

export { router as adminRoutes };
