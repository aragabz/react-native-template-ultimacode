import { API_URL } from '@env';

const DEFAULT_API_BASE_URL = 'https://dummyjson.com';

const resolveApiBaseUrl = (): string => {
  const envApiUrl = API_URL?.trim();

  return envApiUrl || DEFAULT_API_BASE_URL;
};

/**
 * Application-wide configuration constants.
 */
export const APP_CONFIG = {
  APP_NAME: 'ReactNativeTemplate',
  VERSION: '1.0.0',
  API_BASE_URL: resolveApiBaseUrl(),
  API_TIMEOUT: 15000,
  STALE_TIME: 5 * 60 * 1000, // 5 minutes
  GC_TIME: 30 * 60 * 1000, // 30 minutes
  MAX_RETRIES: 2,
  TOKEN_REFRESH_BUFFER: 60 * 1000, // 1 minute before expiry
  TOAST_DURATION: 3000,
  ANIMATION_DURATION: 200,
  DEBOUNCE_DELAY: 300,
  PAGINATION_LIMIT: 20,
  IMAGE_CACHE_POLICY: 'memory-disk' as const,
} as const;

export const ENDPOINTS = {
  POSTS: '/posts',
} as const;
