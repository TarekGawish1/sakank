export const API_BASE_URL = 'https://saknak-api-8918d4530da2.herokuapp.com/api/v1';

const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 2 * 60 * 1000; // 2 minutes

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const token = localStorage.getItem('admin_token');
  const method = options.method || 'GET';
  
  // Return cached data for GET requests if valid
  if (method === 'GET') {
    const cached = cache.get(endpoint);
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return cached.data;
    }
  }
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin_token');
      window.location.href = '/login';
    }
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  const data = await response.json();
  
  // Save GET responses to cache, invalidate cache on mutations
  if (method === 'GET') {
    cache.set(endpoint, { data, timestamp: Date.now() });
  } else {
    cache.clear();
  }

  return data;
}
