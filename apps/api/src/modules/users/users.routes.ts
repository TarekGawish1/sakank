import { Router } from 'express';
import { usersController } from './users.controller';
import { requireAuth } from '~/shared/middlewares/auth';
import { validate } from '~/shared/middlewares/validate';
import { updateStudentProfileSchema, avatarUploadSchema } from './users.validator';

const router = Router();

// PUT /api/v1/profile/student — Complete or update student profile
router.put(
  '/profile/student',
  requireAuth,
  validate({ body: updateStudentProfileSchema }),
  usersController.updateStudentProfile,
);

// POST /api/v1/profile/avatar — Generate presigned URL for avatar upload
router.post(
  '/profile/avatar',
  requireAuth,
  validate({ body: avatarUploadSchema }),
  usersController.generateAvatarUploadUrl,
);

// GET /api/v1/universities — List supported universities (public)
router.get('/universities', usersController.listUniversities);

export { router as usersRoutes };
