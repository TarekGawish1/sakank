import { Request, Response, NextFunction } from 'express';
import { AppError } from '~/shared/errors/AppError';
import { logger } from '~/utils/logger';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    logger.warn({ err }, err.message);
    return res.status(err.statusCode).json({
      success: false,
      data: null,
      meta: null,
      error: {
        code: err.errorCode,
        message: err.message,
        details: err.details || null,
      },
    });
  }

  logger.error({ err }, 'Unhandled Exception');
  return res.status(500).json({
    success: false,
    data: null,
    meta: null,
    error: {
      code: 'SYS_500',
      message: 'Internal Server Error',
      details: null,
    },
  });
};
