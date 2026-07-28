import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import pinoHttp from 'pino-http';
import rateLimit from 'express-rate-limit';

import { logger } from '~/utils/logger';
import { env } from '~/config/env';
import { errorHandler } from '~/middlewares/error';
import { requestId } from '~/middlewares/requestId';

// Module routes
import { healthRoutes } from '~/modules/health/health.routes';
import { authRoutes } from '~/modules/auth/auth.routes';
import { usersRoutes } from '~/modules/users/users.routes';
import { listingsRoutes, favoritesRoutes } from '~/modules/listings/listings.routes';
import { stayRequestsRoutes } from '~/modules/stay-requests/stay-requests.routes';
import { verificationRoutes } from '~/modules/verification/verification.routes';
import { notificationsRoutes } from '~/modules/notifications/notifications.routes';
import { adminRoutes } from '~/modules/admin/admin.routes';
import { propertiesRouter } from '~/modules/properties/properties.routes';
import { uploadRouter } from '~/modules/upload/upload.routes';

const app = express();

// ── Security & Compression ──────────────────────────────────────────
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestId);

// ── Logging ─────────────────────────────────────────────────────────
app.use(
  pinoHttp({
    logger,
    customLogLevel: (req, res, err) => {
      if (res.statusCode >= 500 || err) return 'error';
      if (res.statusCode >= 400) return 'warn';
      return 'info';
    },
    autoLogging: env.NODE_ENV !== 'test',
  })
);

// ── Rate Limiting ───────────────────────────────────────────────────
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});
app.use(globalLimiter);

// Aggressive rate limiter for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

// ── Routes ──────────────────────────────────────────────────────────
// Health check (no prefix)
app.use('/health', healthRoutes);

// API v1 routes
app.use('/api/v1/auth', authLimiter, authRoutes);
app.use('/api/v1', usersRoutes); // /profile/student, /profile/avatar, /universities
app.use('/api/v1/listings', listingsRoutes);
app.use('/api/v1/favorites', favoritesRoutes);
app.use('/api/v1/stay-requests', stayRequestsRoutes);
app.use('/api/v1/verification', verificationRoutes);
app.use('/api/v1/notifications', notificationsRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/properties', propertiesRouter);
app.use('/api/v1/upload', uploadRouter);

// ── Error Handler (MUST be last) ────────────────────────────────────
app.use(errorHandler);

export { app };
