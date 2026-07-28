// import { apiClient } from './client';
// import { ENDPOINTS } from './endpoints';

export const ListingsApi = {
  getListings: async (params?: any): Promise<any> => {
    // return apiClient.get(ENDPOINTS.LISTINGS.BASE, { params });
    throw new Error('Not implemented');
  },

  getListingById: async (id: string): Promise<any> => {
    // return apiClient.get(`${ENDPOINTS.LISTINGS.BASE}/${id}`);
    throw new Error('Not implemented');
  },

  getRelatedListings: async (id: string): Promise<any> => {
    // return apiClient.get(ENDPOINTS.LISTINGS.RELATED(id));
    throw new Error('Not implemented');
  }
};
