import { useMutation } from '@tanstack/react-query';
import { AuthApi } from '../../api/auth.api';
import { getAuthErrorMessage } from './utils';

export const useVerifyEmail = () => {
  return useMutation({
    mutationKey: ['auth', 'verifyEmail'],
    mutationFn: AuthApi.verifyEmail,
    meta: {
      errorMessage: getAuthErrorMessage
    }
  });
};
