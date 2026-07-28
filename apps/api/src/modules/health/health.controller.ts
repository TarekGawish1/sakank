import { Request, Response } from 'express';
import { env } from '~/config/env';

export const getHealth = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    data: {
      status: 'up',
      nodeVersion: process.version,
      environment: env.NODE_ENV,
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    },
    meta: null,
    error: null,
  });
};
