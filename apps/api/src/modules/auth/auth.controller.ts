import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';

export const authController = {
  signup: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.signup(req.body);
      res.status(201).json({
        success: true,
        data: result,
        meta: null,
        error: null,
      });
    } catch (error) {
      next(error);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.login(req.body);
      res.status(200).json({
        success: true,
        data: result,
        meta: null,
        error: null,
      });
    } catch (error) {
      next(error);
    }
  },

  verifyEmail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.verifyEmail(req.body.token);
      res.status(200).json({
        success: true,
        data: result,
        meta: null,
        error: null,
      });
    } catch (error) {
      next(error);
    }
  },

  refresh: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await authService.refresh(req.body.refreshToken);
      res.status(200).json({
        success: true,
        data: result,
        meta: null,
        error: null,
      });
    } catch (error) {
      next(error);
    }
  },

  logout: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await authService.logout(req.body.refreshToken);
      res.status(200).json({
        success: true,
        data: null,
        meta: null,
        error: null,
      });
    } catch (error) {
      next(error);
    }
  },

  getMe: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await authService.getMe(req.user!.userId);
      res.status(200).json({
        success: true,
        data: user,
        meta: null,
        error: null,
      });
    } catch (error) {
      next(error);
    }
  },
};
