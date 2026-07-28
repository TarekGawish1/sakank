import { Request, Response, NextFunction } from 'express';
import { UserRole } from '@prisma/client';
import { ForbiddenError } from '~/shared/errors';

/**
 * Middleware factory that checks if the authenticated user has one of the required roles.
 * Must be used AFTER requireAuth middleware.
 */
export const requireRole = (allowedRoles: UserRole[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ForbiddenError('Authentication required'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ForbiddenError('Insufficient permissions', 'AUTH_002'));
    }

    next();
  };
};
