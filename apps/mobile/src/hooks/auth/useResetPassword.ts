import { useMutation } from '@tanstack/react-query';
import { AuthApi } from '../../api/auth.api';
import { getAuthErrorMessage } from './utils';

export const useResetPassword = () => {
  return useMutation({
    mutationKey: ['auth', 'resetPassword'],
    mutationFn: AuthApi.resetPassword,
    meta: {
      errorMessage: getAuthErrorMessage
    }
  });
};
