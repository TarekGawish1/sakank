import { ApiError, ApiErrorCode } from '../../api/errors';

export const getAuthErrorMessage = (error: unknown): string => {
  if (error instanceof ApiError) {
    if (error.status === 401 || error.code === ApiErrorCode.UNAUTHORIZED) {
      return 'البريد الإلكتروني أو كلمة المرور غير صحيحة';
    }
    if (error.status === 409) {
      return 'هذا الحساب موجود بالفعل';
    }
    if (error.status === 422 || error.code === ApiErrorCode.VALIDATION) {
      return 'البيانات المدخلة غير صحيحة، يرجى التحقق منها';
    }
    if (error.code === ApiErrorCode.NETWORK) {
      return 'لا يوجد اتصال بالإنترنت، يرجى التحقق من الشبكة';
    }
    return error.message || 'حدث خطأ أثناء الاتصال بالخادم';
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'حدث خطأ غير متوقع، يرجى المحاولة مرة أخرى';
};
