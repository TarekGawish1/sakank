import { Request, Response, NextFunction } from 'express';
import { listingsService } from './listings.service';
import { sendSuccess } from '~/shared/utils/response';

export const listingsController = {
  getListings: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.userId;
      console.log('GET LISTINGS CALLED! QUERY:', req.query, 'USERID:', userId);
      const { items, meta } = await listingsService.getListingsFeed(req.query as never, userId);
      console.log('RETURNING ITEMS COUNT:', items.length);
      return sendSuccess(res, items, meta);
    } catch (error) {
      next(error);
    }
  },

  getListingById: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user?.userId;
      const result = await listingsService.getListingDetail(req.params.id, userId);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  getRelatedListings: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await listingsService.getRelatedListings(req.params.id);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  toggleFavorite: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      const result = await listingsService.toggleFavorite(userId, req.params.listingId);
      return sendSuccess(res, result);
    } catch (error) {
      next(error);
    }
  },

  getFavorites: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.user!.userId;
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const { items, meta } = await listingsService.getFavorites(userId, page, limit);
      return sendSuccess(res, items, meta);
    } catch (error) {
      next(error);
    }
  },
};
