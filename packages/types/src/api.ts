export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T | null;
  meta: unknown | null;
  error: unknown | null;
}
