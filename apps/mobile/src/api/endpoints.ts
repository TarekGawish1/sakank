/**
 * Centralized API Routes Configuration
 */
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    REFRESH: '/auth/refresh',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    VERIFY_EMAIL: '/auth/verify-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  PROFILE: {
    STUDENT: '/profile/student',
    AVATAR: '/profile/avatar',
    UNIVERSITIES: '/universities',
  },
  LISTINGS: {
    BASE: '/listings',
    RELATED: (id: string) => `/listings/${id}/related`,
  },
  FAVORITES: {
    BASE: '/favorites',
    TOGGLE: (id: string) => `/favorites/${id}`,
  },
  STAY_REQUESTS: {
    BASE: '/stay-requests',
    ACCEPT: (id: string) => `/stay-requests/${id}/accept`,
    REJECT: (id: string) => `/stay-requests/${id}/reject`,
    CANCEL: (id: string) => `/stay-requests/${id}/cancel`,
  },
  NOTIFICATIONS: {
    BASE: '/notifications',
    UNREAD: '/notifications/unread',
    READ_ALL: '/notifications/read-all',
    READ_ONE: (id: string) => `/notifications/${id}/read`,
  },
  UPLOAD: {
    SIGNATURE: '/upload/signature',
  },
  VERIFICATION: {
    BASE: '/verification',
    STATUS: '/verification/status',
  }
};
