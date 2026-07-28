import { Router } from 'express';
import { authController } from './auth.controller';
import { validate } from '~/shared/middlewares/validate';
import { requireAuth } from '~/shared/middlewares/auth';
import {
  signupSchema,
  loginSchema,
  verifyEmailSchema,
  refreshTokenSchema,
  logoutSchema,
} from './auth.validator';

export const authRouter = Router();

// Registration & Login
authRouter.post('/signup', validate({ body: signupSchema }), authController.signup);
authRouter.post('/login', validate({ body: loginSchema }), authController.login);
authRouter.post('/verify-email', validate({ body: verifyEmailSchema }), authController.verifyEmail);

// Session Management
authRouter.post('/refresh', validate({ body: refreshTokenSchema }), authController.refresh);
authRouter.post('/logout', requireAuth, validate({ body: logoutSchema }), authController.logout);

// User Profile
authRouter.get('/me', requireAuth, authController.getMe);
