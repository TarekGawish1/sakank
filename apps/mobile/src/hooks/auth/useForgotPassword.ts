import { useMutation } from '@tanstack/react-query';
import { AuthApi } from '../../api/auth.api';
import { getAuthErrorMessage } from './utils';

export const useForgotPassword = () => {
  return useMutation({
    mutationKey: ['auth', 'forgotPassword'],
    mutationFn: AuthApi.forgotPassword,
    meta: {
      errorMessage: getAuthErrorMessage
    }
  });
};
