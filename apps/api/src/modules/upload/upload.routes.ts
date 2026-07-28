import { Router } from 'express';
import { uploadController } from './upload.controller';
import { requireAuth } from '~/shared/middlewares/auth';

export const uploadRouter = Router();

// GET /api/v1/upload/signature
// Generates a signature for direct Cloudinary uploads. Requires authentication.
uploadRouter.get('/signature', requireAuth, uploadController.getSignature);
