import { ENV } from '../config/env';
import { ApiError, ApiErrorCode } from './errors';
import { TokenManager } from './tokenManager';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestConfig extends RequestInit {
  timeout?: number;
  params?: Record<string, string | number | boolean | undefined>;
  data?: any;
}

/**
 * Core HTTP Client wrapped around native fetch.
 * Provides interceptors, timeout, and centralized error handling.
 */
class ApiClient {
  private baseURL: string;
  private defaultTimeout: number;

  constructor(baseURL: string, defaultTimeout: number) {
    this.baseURL = baseURL;
    this.defaultTimeout = defaultTimeout;
  }

  // Request Interceptor Logic
  private async runRequestInterceptors(config: RequestConfig): Promise<RequestConfig> {
    const headers = new Headers(config.headers || {});
    
    // Set default JSON headers
    if (!headers.has('Content-Type') && !(config.data instanceof FormData)) {
      headers.set('Content-Type', 'application/json');
    }
    headers.set('Accept', 'application/json');

    // Inject Auth Token
    const token = await TokenManager.getAccessToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    config.headers = headers;
    return config;
  }

  // Response Interceptor Logic
  private async runResponseInterceptors(response: Response): Promise<Response> {
    // Token refresh flow can be handled here in the future
    return response;
  }

  // Handle centralized errors
  private async handleError(response: Response) {
    let data;
    try {
      const text = await response.text();
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }
    } catch (e) {
      data = null;
    }

    const message = data?.message || response.statusText || 'Unknown error occurred';

    if (response.status === 401) throw new ApiError(message, ApiErrorCode.UNAUTHORIZED, 401, data);
    if (response.status === 403) throw new ApiError(message, ApiErrorCode.FORBIDDEN, 403, data);
    if (response.status === 400 || response.status === 422) throw new ApiError(message, ApiErrorCode.VALIDATION, response.status, data);
    if (response.status >= 500) throw new ApiError(message, ApiErrorCode.SERVER, response.status, data);

    throw new ApiError(message, ApiErrorCode.UNKNOWN, response.status, data);
  }

  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean | undefined>): string {
    const cleanBaseURL = this.baseURL.endsWith('/') ? this.baseURL.slice(0, -1) : this.baseURL;
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    
    const url = new URL(`${cleanBaseURL}${cleanEndpoint}`);
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, String(params[key]));
        }
      });
    }
    return url.toString();
  }

  public async request<T>(method: HttpMethod, endpoint: string, config: RequestConfig = {}): Promise<T> {
    const interceptedConfig = await this.runRequestInterceptors(config);
    const url = this.buildUrl(endpoint, interceptedConfig.params);
    
    const fetchOptions: RequestInit = {
      method,
      headers: interceptedConfig.headers,
    };

    if (interceptedConfig.data) {
      fetchOptions.body = interceptedConfig.data instanceof FormData 
        ? interceptedConfig.data 
        : JSON.stringify(interceptedConfig.data);
    }

    const timeoutMs = interceptedConfig.timeout || this.defaultTimeout;
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    fetchOptions.signal = controller.signal;

    try {
      let response = await fetch(url, fetchOptions);
      clearTimeout(id);
      
      response = await this.runResponseInterceptors(response);

      if (!response.ok) {
        await this.handleError(response);
      }

      // Handle empty responses
      if (response.status === 204) {
        return {} as T;
      }
      
      return await response.json() as T;
    } catch (error: any) {
      clearTimeout(id);
      if (error.name === 'AbortError') {
        throw new ApiError('Request timed out', ApiErrorCode.TIMEOUT);
      }
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(error.message || 'Network error', ApiErrorCode.NETWORK);
    }
  }

  public get<T>(endpoint: string, config?: Omit<RequestConfig, 'data'>) {
    return this.request<T>('GET', endpoint, config);
  }

  public post<T>(endpoint: string, data?: any, config?: RequestConfig) {
    return this.request<T>('POST', endpoint, { ...config, data });
  }

  public put<T>(endpoint: string, data?: any, config?: RequestConfig) {
    return this.request<T>('PUT', endpoint, { ...config, data });
  }

  public patch<T>(endpoint: string, data?: any, config?: RequestConfig) {
    return this.request<T>('PATCH', endpoint, { ...config, data });
  }

  public delete<T>(endpoint: string, config?: RequestConfig) {
    return this.request<T>('DELETE', endpoint, config);
  }
}

export const apiClient = new ApiClient(ENV.API_BASE_URL, ENV.TIMEOUT);
