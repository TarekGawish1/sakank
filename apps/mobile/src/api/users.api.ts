// import { apiClient } from './client';
// import { ENDPOINTS } from './endpoints';

export const UsersApi = {
  updateStudentProfile: async (profileData: any): Promise<any> => {
    // return apiClient.put(ENDPOINTS.PROFILE.STUDENT, profileData);
    throw new Error('Not implemented');
  },

  getUniversities: async (): Promise<any> => {
    // return apiClient.get(ENDPOINTS.PROFILE.UNIVERSITIES);
    throw new Error('Not implemented');
  },

  getAvatarUploadUrl: async (data: { contentType: string; fileName: string }): Promise<any> => {
    // return apiClient.post(ENDPOINTS.PROFILE.AVATAR, data);
    throw new Error('Not implemented');
  }
};
