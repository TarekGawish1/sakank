import { Response } from 'express';
import { PaginationMeta, CursorPaginationMeta } from '~/shared/types';

export const sendSuccess = <T>(
  res: Response,
  data: T,
  meta: PaginationMeta | CursorPaginationMeta | null = null,
  statusCode = 200,
) => {
  return res.status(statusCode).json({
    success: true,
    data,
    meta,
    error: null,
  });
};

export const sendCreated = <T>(res: Response, data: T) => {
  return sendSuccess(res, data, null, 201);
};

export const sendNoContent = (res: Response) => {
  return res.status(204).send();
};
