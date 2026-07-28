// Centralized environment variables configuration
export const ENV = {
  // Replace with actual production URL or local network IP for mobile (e.g., 10.0.2.2 or local IP)
  API_BASE_URL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api/v1',
  TIMEOUT: 10000,
};
