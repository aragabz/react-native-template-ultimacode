/**
 * App storage key constants.
 * Centralized to avoid typos and enable easy refactoring.
 */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth-token',
  REFRESH_TOKEN: 'refresh-token',
  AUTH_STORAGE: 'auth-storage',
  SETTINGS_STORAGE: 'settings-storage',
  ONBOARDING_SEEN: 'onboarding-seen',
  THEME_PREFERENCE: 'theme-preference',
  LANGUAGE: 'language',
  PUSH_TOKEN: 'push-token',
  BIOMETRIC_ENABLED: 'biometric-enabled',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];
