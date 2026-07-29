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

// GET /api/v1/admin/stats
router.get('/stats', adminController.getStats);

// GET /api/v1/admin/users
router.get('/users', adminController.listUsers);

// POST /api/v1/admin/users/:id/block
router.post('/users/:id/block', adminController.blockUser);

// PUT /api/v1/admin/users/:id
router.put('/users/:id', adminController.updateUser);

// GET /api/v1/admin/properties
router.get('/properties', adminController.listProperties);

// DELETE /api/v1/admin/properties/:id
router.delete('/properties/:id', adminController.deleteProperty);

// PUT /api/v1/admin/properties/:id
router.put('/properties/:id', adminController.updateProperty);

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
