// import { apiClient } from './client';
// import { ENDPOINTS } from './endpoints';

export const FavoritesApi = {
  getFavorites: async (params?: any): Promise<any> => {
    // return apiClient.get(ENDPOINTS.FAVORITES.BASE, { params });
    throw new Error('Not implemented');
  },

  toggleFavorite: async (listingId: string): Promise<any> => {
    // return apiClient.post(ENDPOINTS.FAVORITES.TOGGLE(listingId));
    throw new Error('Not implemented');
  }
};
