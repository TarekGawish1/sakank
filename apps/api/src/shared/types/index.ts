import { UserRole } from '@prisma/client';

export interface JwtPayload {
  userId: string;
  role: UserRole;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
}

export interface CursorPaginationMeta {
  cursor: string | null;
  limit: number;
  hasMore: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T | null;
  meta: PaginationMeta | CursorPaginationMeta | null;
  error: {
    code: string;
    message: string;
    details?: { field: string; issue: string }[] | null;
  } | null;
}
