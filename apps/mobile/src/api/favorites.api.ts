import { apiClient } from './client';
import { ENDPOINTS } from './endpoints';
import { ListingsResponse } from './listings.api';

export const FavoritesApi = {
  getFavorites: async (params?: any): Promise<ListingsResponse> => {
    const response = await apiClient.get<any>(ENDPOINTS.FAVORITES.BASE, { params });
    return {
      items: response.data || [],
      meta: response.meta || { cursor: null, limit: 20, hasMore: false }
    };
  },

  toggleFavorite: async (listingId: string): Promise<any> => {
    const response = await apiClient.post<any>(ENDPOINTS.FAVORITES.TOGGLE(listingId));
    return response.data;
  }
};
