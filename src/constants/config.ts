/**
 * Application-wide configuration constants.
 */
export const APP_CONFIG = {
  APP_NAME: 'ReactNativeTemplate',
  VERSION: '1.0.0',
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
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  REFRESH_TOKEN: '/auth/refresh',
  FORGOT_PASSWORD: '/auth/forgot-password',
  POSTS: '/posts',
  USERS: '/users',
} as const;
