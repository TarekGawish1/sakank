import { Router } from 'express';
import { propertiesController } from './properties.controller';
import { requireAuth } from '~/shared/middlewares/auth';
import { requireRole } from '~/shared/middlewares/requireRole';
import { validate } from '~/shared/middlewares/validate';
import { createPropertySchema } from './properties.validator';

export const propertiesRouter = Router();

// Only owners can create properties
propertiesRouter.post(
  '/',
  requireAuth,
  requireRole(['OWNER', 'ADMIN']),
  validate({ body: createPropertySchema }),
  propertiesController.createProperty
);
