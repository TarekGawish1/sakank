import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthApi, AuthUser } from '../../api/auth.api';
import { getAuthErrorMessage } from './utils';

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['auth', 'login'],
    mutationFn: AuthApi.login,
    onSuccess: (user: AuthUser) => {
      // Update session state
      queryClient.setQueryData(['auth', 'session'], user);
    },
    meta: {
      errorMessage: getAuthErrorMessage
    }
  });
};
