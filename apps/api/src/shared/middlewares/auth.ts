import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '~/lib/jwt';
import { UnauthorizedError } from '~/shared/errors';
import { logger } from '~/utils/logger';

/**
 * Middleware that verifies the JWT access token from the Authorization header.
 * Injects `req.user` with { userId, role } on success.
 */
export const requireAuth = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedError('Missing or malformed Authorization header');
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedError('Missing access token');
    }

    const payload = verifyAccessToken(token);
    req.user = {
      userId: payload.userId,
      role: payload.role,
    };

    next();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      next(error);
      return;
    }
    logger.warn({ error }, 'JWT verification failed');
    next(new UnauthorizedError('Invalid or expired access token'));
  }
};
