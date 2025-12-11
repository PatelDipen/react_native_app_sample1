import api from './api';
import { User } from '@/store/authStore';

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface RegisterResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

/**
 * Login user
 */
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/login', data);
  // Push token from header to body for consistency
  response.data.accessToken = response.headers.token;
  return response.data;
};

/**
 * Register new user
 */
export const register = async (data: RegisterRequest): Promise<RegisterResponse> => {
  const response = await api.post<RegisterResponse>('/register', data);
  return response.data;
};

/**
 * Logout user
 */
export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

/**
 * Get current user profile
 */
export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<User>('/profile');
  return response.data;
};

/**
 * Update user profile
 */
export const updateProfile = async (data: Partial<User>): Promise<User> => {
  const response = await api.put<User>('/auth/profile', data);
  return response.data;
};
