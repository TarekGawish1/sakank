import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthApi, AuthUser } from '../../api/auth.api';
import { TokenManager } from '../../api/tokenManager';
import { queryKeys } from '../../lib/react-query/queryKeys';

export const useSession = () => {
  const queryClient = useQueryClient();

  // 1. Get current user session from API or cache
  const { data: user, isLoading, isError } = useQuery<AuthUser | null>({
    queryKey: queryKeys.auth.session,
    queryFn: async () => {
      try {
        const token = await TokenManager.getAccessToken();
        if (!token) return null;
        
        const currentUser = await AuthApi.getCurrentUser();
        return currentUser;
      } catch (error) {
        // If getting user fails, clear local tokens as they might be invalid
        await TokenManager.clearTokens();
        return null;
      }
    },
    staleTime: 1000 * 60 * 15, // Consider session fresh for 15 minutes
    retry: false, // Don't retry fetching session to avoid multiple 401s
  });

  // Guest Mode
  const { data: isGuest } = useQuery({ 
    queryKey: queryKeys.auth.guest, 
    queryFn: () => false,
    initialData: false,
    staleTime: Infinity 
  });

  const setGuest = () => {
    queryClient.setQueryData(queryKeys.auth.guest, true);
  };

  // 2. Logout mutation
  const logoutMutation = useMutation({
    mutationKey: ['auth', 'logout'],
    mutationFn: () => AuthApi.logout(),
    onSettled: () => {
      // Regardless of success or failure, clear the session from cache
      queryClient.setQueryData(queryKeys.auth.session, null);
      queryClient.setQueryData(queryKeys.auth.guest, false); // Also clear guest on explicit logout
      queryClient.clear(); // Clear all other queries (like favorites, etc.)
    }
  });

  return {
    user,
    isAuthenticated: !!user,
    isLoadingSession: isLoading,
    isSessionError: isError,
    isGuest: !!isGuest,
    setGuest,
    logout: logoutMutation.mutate,
    isLoggingOut: logoutMutation.isPending,
  };
};
