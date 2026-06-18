import { apiClient } from '../apiClient';
import type { User } from '@store/useAuthStore';

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  user: User;
  token: string;
};

export const login = (data: LoginRequest): Promise<LoginResponse> => {
  return apiClient.post('/auth/login', data).then((res) => res.data);
};

export const logout = (): Promise<void> => {
  return apiClient.post('/auth/logout').then((res) => res.data);
};

export const getProfile = (): Promise<User> => {
  return apiClient.get('/auth/profile').then((res) => res.data);
};
