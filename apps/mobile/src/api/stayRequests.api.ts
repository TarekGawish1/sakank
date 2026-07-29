import { apiClient } from './client';
import { ENDPOINTS } from './endpoints';

export interface CreateStayRequestDto {
  listingId: string;
  message?: string;
  moveInDate: string;
  durationMonths: number;
}

export interface StayRequestResponse {
  id: string;
  listingId: string;
  status: string;
  message: string | null;
  moveInDate: string;
  durationMonths: number;
  ownerResponse: string | null;
  respondedAt: string | null;
  createdAt: string;
  listing: {
    id: string;
    title: string;
    monthlyRent: number;
    primaryImage: string | null;
    location: string;
  };
  student: {
    id: string;
    firstName: string;
    lastName: string;
  };
  ownerPhone: string | null;
}

export interface StayRequestsListResponse {
  items: StayRequestResponse[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

export const StayRequestsApi = {
  createRequest: async (data: CreateStayRequestDto): Promise<StayRequestResponse> => {
    const response = await apiClient.post<any>(ENDPOINTS.STAY_REQUESTS.BASE, data);
    return response.data;
  },

  getRequests: async (params?: any): Promise<StayRequestsListResponse> => {
    const response = await apiClient.get<any>(ENDPOINTS.STAY_REQUESTS.BASE, { params });
    return {
      items: response.data || [],
      meta: response.meta || { page: 1, limit: 20, total: 0 }
    };
  },

  getRequestById: async (id: string): Promise<StayRequestResponse> => {
    const response = await apiClient.get<any>(`${ENDPOINTS.STAY_REQUESTS.BASE}/${id}`);
    return response.data;
  },

  cancelRequest: async (id: string): Promise<any> => {
    const response = await apiClient.post<any>(ENDPOINTS.STAY_REQUESTS.CANCEL(id));
    return response.data;
  }
};
