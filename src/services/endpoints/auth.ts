import { apiClient } from '../apiClient';
import {
  loginResponseSchema,
  refreshTokensResponseSchema,
  userSchema,
} from '../schemas';
import type { User, LoginResponse, RefreshTokensResponse } from '../schemas';

export type LoginRequest = {
  email: string;
  password: string;
};

export type { LoginResponse, RefreshTokensResponse, User };

export const login = (data: LoginRequest): Promise<LoginResponse> => {
  return apiClient
    .post('/auth/login', data)
    .then(res => loginResponseSchema.parse(res.data));
};

export const logout = (): Promise<void> => {
  return apiClient.post('/auth/logout').then(() => undefined);
};

export const refreshTokens = (
  refreshToken: string,
): Promise<RefreshTokensResponse> => {
  return apiClient
    .post('/auth/refresh', { refreshToken })
    .then(res => refreshTokensResponseSchema.parse(res.data));
};

export const getProfile = (): Promise<User> => {
  return apiClient.get('/auth/profile').then(res => userSchema.parse(res.data));
};
