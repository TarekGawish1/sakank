export interface ErrorDetail {
  field: string;
  issue: string;
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly errorCode: string;
  public readonly details: ErrorDetail[] | null;

  constructor(
    message: string,
    statusCode: number,
    errorCode: string,
    isOperational = true,
    details: ErrorDetail[] | null = null,
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.isOperational = isOperational;
    this.details = details;
    Error.captureStackTrace(this);
  }
}
