import { apiClient } from './client';
import { ENDPOINTS } from './endpoints';
import { ApiResponse } from '../types/api.types';

export interface ListingFeedItem {
  id: string;
  title: string;
  description: string;
  monthlyRent: number;
  unitType: string;
  genderRestriction: string;
  availabilityStatus: string;
  availableFrom: string;
  capacity: number;
  availableBeds: number;
  isFeatured: boolean;
  primaryImage: string | null;
  location: {
    governorate: string;
    city: string;
    area: string;
  };
  createdAt: string;
}

export interface ListingsResponse {
  items: ListingFeedItem[];
  meta: {
    cursor: string | null;
    limit: number;
    hasMore: boolean;
  };
}

export const ListingsApi = {
  getListings: async (params?: any): Promise<ListingsResponse> => {
    const response = await apiClient.get<any>(ENDPOINTS.LISTINGS.BASE, { params });
    return {
      items: response.data || [],
      meta: response.meta || { cursor: null, limit: 20, hasMore: false }
    };
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
