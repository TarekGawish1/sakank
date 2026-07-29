import { Router } from 'express';
import { listingsController } from './listings.controller';
import { requireAuth, optionalAuth } from '~/shared/middlewares/auth';
import { validate } from '~/shared/middlewares/validate';
import {
  listingsQuerySchema,
  listingIdParamSchema,
  favoriteParamSchema,
  favoritesQuerySchema,
} from './listings.validator';

const router = Router();

// GET /api/v1/listings — Paginated home feed with filters
router.get(
  '/',
  optionalAuth,
  validate({ query: listingsQuerySchema }),
  listingsController.getListings,
);

// GET /api/v1/listings/:id — Full listing details
router.get(
  '/:id',
  optionalAuth,
  validate({ params: listingIdParamSchema }),
  listingsController.getListingById,
);

// GET /api/v1/listings/:id/related — 3 nearby listings
router.get(
  '/:id/related',
  requireAuth,
  validate({ params: listingIdParamSchema }),
  listingsController.getRelatedListings,
);

export { router as listingsRoutes };

// Separate router for favorites (mounted under /api/v1/favorites)
const favoritesRouter = Router();

// POST /api/v1/favorites/:listingId — Toggle favorite
favoritesRouter.post(
  '/:listingId',
  requireAuth,
  validate({ params: favoriteParamSchema }),
  listingsController.toggleFavorite,
);

// GET /api/v1/favorites — List saved listings
favoritesRouter.get(
  '/',
  requireAuth,
  validate({ query: favoritesQuerySchema }),
  listingsController.getFavorites,
);

export { favoritesRouter as favoritesRoutes };
