import { apiClient } from './client';
import { ENDPOINTS } from './endpoints';
import { TokenManager } from './tokenManager';
import { ApiResponse } from '../types/api.types';

export interface AuthUser {
  id: string;
  role: string;
  isCompleted: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export interface SignupResponse {
  message: string;
}

export const AuthApi = {
  login: async (credentials: any): Promise<AuthUser> => {
    const response = await apiClient.post<ApiResponse<AuthTokens>>(ENDPOINTS.AUTH.LOGIN, credentials);
    const { accessToken, refreshToken, user } = response.data;
    
    await TokenManager.setAccessToken(accessToken);
    if (refreshToken) {
      await TokenManager.setRefreshToken(refreshToken);
    }
    
    return user;
  },

  register: async (userData: any): Promise<any> => {
    const response = await apiClient.post<ApiResponse<SignupResponse | AuthTokens>>(ENDPOINTS.AUTH.SIGNUP, userData);
    
    if (response.data && 'accessToken' in response.data) {
      const { accessToken, refreshToken, user } = response.data as AuthTokens;
      await TokenManager.setAccessToken(accessToken);
      if (refreshToken) {
        await TokenManager.setRefreshToken(refreshToken);
      }
      return user;
    }

    return response.data;
  },

  getCurrentUser: async (): Promise<any> => {
    const response = await apiClient.get<ApiResponse<any>>(ENDPOINTS.AUTH.ME);
    return response.data;
  },

  logout: async (): Promise<void> => {
    const refreshToken = await TokenManager.getRefreshToken();
    if (refreshToken) {
      try {
        await apiClient.post(ENDPOINTS.AUTH.LOGOUT, { refreshToken });
      } catch (error) {
        // Safe to ignore remote logout errors (e.g. token expired) if we are clearing local state anyway
      }
    }
    await TokenManager.clearTokens();
  }
};
