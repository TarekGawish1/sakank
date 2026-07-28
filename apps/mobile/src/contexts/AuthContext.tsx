import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AuthApi, AuthUser } from '../api/auth.api';
import { TokenManager } from '../api/tokenManager';

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (credentials: any) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const bootstrap = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    try {
      const token = await TokenManager.getAccessToken();
      if (!token) {
        setState({ user: null, isAuthenticated: false, isLoading: false });
        return;
      }

      const user = await AuthApi.getCurrentUser();
      setState({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      await TokenManager.clearTokens();
      setState({ user: null, isAuthenticated: false, isLoading: false });
    }
  }, []);

  useEffect(() => {
    bootstrap();
  }, [bootstrap]);

  const login = async (credentials: any) => {
    // AuthApi.login handles backend request and TokenManager persistence internally
    const user = await AuthApi.login(credentials);
    setState({ user, isAuthenticated: true, isLoading: false });
  };

  const logout = async () => {
    await AuthApi.logout();
    setState({ user: null, isAuthenticated: false, isLoading: false });
  };

  const refreshUser = async () => {
    // refreshUser just re-runs the bootstrap sequence to pull the latest user profile
    await bootstrap();
  };

  const value: AuthContextValue = {
    ...state,
    login,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
