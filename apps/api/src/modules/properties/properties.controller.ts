import { Request, Response, NextFunction } from 'express';
import { propertiesService } from './properties.service';

export const propertiesController = {
  createProperty: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const property = await propertiesService.createProperty(req.user!.userId, req.body);
      res.status(201).json({
        success: true,
        data: property,
        meta: null,
        error: null,
      });
    } catch (error) {
      next(error);
    }
  },
};
