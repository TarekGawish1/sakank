import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthApi } from '../../api/auth.api';
import { getAuthErrorMessage } from './utils';

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['auth', 'register'],
    mutationFn: AuthApi.register,
    onSuccess: (data) => {
      // If the API automatically logs in the user after register, we can update session
      if (data && data.id) {
        queryClient.setQueryData(['auth', 'session'], data);
      }
    },
    meta: {
      errorMessage: getAuthErrorMessage
    }
  });
};
