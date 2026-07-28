import { AppError } from './AppError';

export { AppError } from './AppError';
export type { ErrorDetail } from './AppError';

export class UnauthorizedError extends AppError {
  constructor(message = 'Invalid or expired token', errorCode = 'AUTH_001') {
    super(message, 401, errorCode);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Access denied', errorCode = 'AUTH_002') {
    super(message, 403, errorCode);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, errorCode = 'NOT_FOUND') {
    super(`${resource} not found`, 404, errorCode);
  }
}

export class ConflictError extends AppError {
  constructor(message: string, errorCode = 'CONFLICT') {
    super(message, 409, errorCode);
  }
}

export class ValidationError extends AppError {
  constructor(
    message = 'Validation failed',
    details: { field: string; issue: string }[] | null = null,
  ) {
    super(message, 400, 'VAL_001', true, details);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string, errorCode = 'BAD_REQUEST') {
    super(message, 400, errorCode);
  }
}
