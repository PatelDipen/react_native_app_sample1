import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import Config from '@/config/config';
import { useAuthStore } from '@/store/authStore';
import { useLoadingStore } from '@/store/loadingStore';
import { getTokens, storeTokens } from '@/utils/storage';

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: Config.API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token and start loading
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Start loading indicator
    const requestKey = `${config.method}_${config.url}`;
    useLoadingStore.getState().startLoading(requestKey);

    // Add request key to config for later reference
    (config as any).requestKey = requestKey;

    // Add auth token
    const tokens = await getTokens();
    if (tokens?.accessToken) {
      config.headers.Authorization = tokens.accessToken;
    }

    // Debug logging
    if (__DEV__) {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        baseURL: config.baseURL,
        headers: config.headers,
        data: config.data,
        params: config.params,
      });
    }

    return config;
  },
  (error: AxiosError) => {
    // Stop loading on error
    const requestKey = (error.config as any)?.requestKey;
    if (requestKey) {
      useLoadingStore.getState().stopLoading(requestKey);
    }
    return Promise.reject(error);
  },
);

// Response interceptor - Handle token refresh and stop loading
api.interceptors.response.use(
  response => {
    // Stop loading indicator
    const requestKey = (response.config as any)?.requestKey;
    if (requestKey) {
      useLoadingStore.getState().stopLoading(requestKey);
    }

    // Debug logging
    if (__DEV__) {
      console.log('✅ API Response:', {
        method: response.config.method?.toUpperCase(),
        url: response.config.url,
        status: response.status,
        statusText: response.statusText,
        data: response.data,
      });
    }

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
      requestKey?: string;
    };

    // Stop loading indicator
    if (originalRequest?.requestKey) {
      useLoadingStore.getState().stopLoading(originalRequest.requestKey);
    }

    // Debug logging
    if (__DEV__) {
      console.log('❌ API Error:', {
        method: originalRequest?.method?.toUpperCase(),
        url: originalRequest?.url,
        status: error.response?.status,
        statusText: error.response?.statusText,
        errorMessage: error.message,
        errorData: error.response?.data,
      });
    }

    // Handle token refresh on 401
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const tokens = await getTokens();

        if (tokens?.refreshToken) {
          // Attempt to refresh the token
          const response = await axios.post(
            `${Config.API_BASE_URL}/auth/refresh`,
            {
              refreshToken: tokens.refreshToken,
            },
          );

          const newTokens = {
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken || tokens.refreshToken,
          };

          // Update tokens
          await storeTokens(newTokens);
          useAuthStore.getState().updateTokens(newTokens);

          // Retry original request with new token
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
          }

          // Start loading again for retry
          if (originalRequest.requestKey) {
            useLoadingStore.getState().startLoading(originalRequest.requestKey);
          }

          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, logout user
        useAuthStore.getState().clearAuth();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;

/**
 * Type-safe API error handler
 */
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return (
        error.response.data?.message || error.message || 'An error occurred'
      );
    } else if (error.request) {
      return 'Network error. Please check your connection.';
    }
  }
  return 'An unexpected error occurred';
};
