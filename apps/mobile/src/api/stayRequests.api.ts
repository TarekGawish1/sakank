// import { apiClient } from './client';
// import { ENDPOINTS } from './endpoints';

export const StayRequestsApi = {
  createRequest: async (data: any): Promise<any> => {
    // return apiClient.post(ENDPOINTS.STAY_REQUESTS.BASE, data);
    throw new Error('Not implemented');
  },

  getRequests: async (params?: any): Promise<any> => {
    // return apiClient.get(ENDPOINTS.STAY_REQUESTS.BASE, { params });
    throw new Error('Not implemented');
  },

  getRequestById: async (id: string): Promise<any> => {
    // return apiClient.get(`${ENDPOINTS.STAY_REQUESTS.BASE}/${id}`);
    throw new Error('Not implemented');
  },

  cancelRequest: async (id: string): Promise<any> => {
    // return apiClient.post(ENDPOINTS.STAY_REQUESTS.CANCEL(id));
    throw new Error('Not implemented');
  }
};
