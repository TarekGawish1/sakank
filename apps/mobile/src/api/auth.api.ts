// import { apiClient } from './client';
// import { ENDPOINTS } from './endpoints';

export const AuthApi = {
  login: async (credentials: any): Promise<any> => {
    // return apiClient.post(ENDPOINTS.AUTH.LOGIN, credentials);
    throw new Error('Not implemented');
  },

  signup: async (userData: any): Promise<any> => {
    // return apiClient.post(ENDPOINTS.AUTH.SIGNUP, userData);
    throw new Error('Not implemented');
  },

  getMe: async (): Promise<any> => {
    // return apiClient.get(ENDPOINTS.AUTH.ME);
    throw new Error('Not implemented');
  },

  logout: async (refreshToken: string): Promise<any> => {
    // return apiClient.post(ENDPOINTS.AUTH.LOGOUT, { refreshToken });
    throw new Error('Not implemented');
  }
};
