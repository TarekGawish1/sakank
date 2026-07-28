import { Router } from 'express';
import { stayRequestsController } from './stay-requests.controller';
import { requireAuth } from '~/shared/middlewares/auth';
import { validate } from '~/shared/middlewares/validate';
import {
  createStayRequestSchema,
  stayRequestIdParamSchema,
  stayRequestsQuerySchema,
  rejectRequestSchema,
} from './stay-requests.validator';

const router = Router();

// POST /api/v1/stay-requests — Submit a stay request
router.post(
  '/',
  requireAuth,
  validate({ body: createStayRequestSchema }),
  stayRequestsController.create,
);

// GET /api/v1/stay-requests — List requests (student or owner)
router.get(
  '/',
  requireAuth,
  validate({ query: stayRequestsQuerySchema }),
  stayRequestsController.list,
);

// GET /api/v1/stay-requests/:id — Get request details
router.get(
  '/:id',
  requireAuth,
  validate({ params: stayRequestIdParamSchema }),
  stayRequestsController.getById,
);

// POST /api/v1/stay-requests/:id/accept — Owner accepts
router.post(
  '/:id/accept',
  requireAuth,
  validate({ params: stayRequestIdParamSchema }),
  stayRequestsController.accept,
);

// POST /api/v1/stay-requests/:id/reject — Owner rejects
router.post(
  '/:id/reject',
  requireAuth,
  validate({ params: stayRequestIdParamSchema, body: rejectRequestSchema }),
  stayRequestsController.reject,
);

// POST /api/v1/stay-requests/:id/cancel — Student cancels
router.post(
  '/:id/cancel',
  requireAuth,
  validate({ params: stayRequestIdParamSchema }),
  stayRequestsController.cancel,
);

export { router as stayRequestsRoutes };
