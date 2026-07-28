// import { apiClient } from './client';
// import { ENDPOINTS } from './endpoints';

export const NotificationsApi = {
  getNotifications: async (params?: any): Promise<any> => {
    // return apiClient.get(ENDPOINTS.NOTIFICATIONS.BASE, { params });
    throw new Error('Not implemented');
  },

  getUnreadCount: async (): Promise<any> => {
    // return apiClient.get(ENDPOINTS.NOTIFICATIONS.UNREAD);
    throw new Error('Not implemented');
  },

  markAllAsRead: async (): Promise<any> => {
    // return apiClient.patch(ENDPOINTS.NOTIFICATIONS.READ_ALL);
    throw new Error('Not implemented');
  },

  markAsRead: async (id: string): Promise<any> => {
    // return apiClient.patch(ENDPOINTS.NOTIFICATIONS.READ_ONE(id));
    throw new Error('Not implemented');
  }
};
