/**
 * Crash Reporting Service Abstraction
 *
 * This module provides a no-op implementation that can be replaced
 * with Sentry or any other crash reporting provider.
 *
 * To integrate Sentry:
 * 1. Install: npx expo install @sentry/react-native
 * 2. Replace the no-op functions below with Sentry.* calls
 */

export interface CrashReportingUser {
  id: string;
  email?: string;
  username?: string;
}

export interface Breadcrumb {
  category: string;
  message: string;
  level?: 'debug' | 'info' | 'warning' | 'error' | 'fatal';
  data?: Record<string, unknown>;
}

interface CrashReportingConfig {
  dsn: string;
  enabled: boolean;
  environment?: string;
  debug?: boolean;
}

let config: CrashReportingConfig = {
  dsn: '',
  enabled: false,
};

export function initCrashReporting(options: CrashReportingConfig): void {
  config = options;

  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log('[CrashReporting] Initialized:', {
      enabled: config.enabled,
      environment: config.environment,
    });
  }
}

export const crashReporting = {
  captureException(error: Error, context?: Record<string, unknown>): void {
    if (!config.enabled) return;
    // Replace with: Sentry.captureException(error, { extra: context });
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error('[CrashReporting] Exception:', error.message, context);
    }
  },

  captureMessage(message: string, level: Breadcrumb['level'] = 'info'): void {
    if (!config.enabled) return;
    // Replace with: Sentry.captureMessage(message, level);
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log(`[CrashReporting] ${level}: ${message}`);
    }
  },

  setUser(user: CrashReportingUser): void {
    if (!config.enabled) return;
    // Replace with: Sentry.setUser(user);
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('[CrashReporting] User set:', user.id);
    }
  },

  clearUser(): void {
    if (!config.enabled) return;
    // Replace with: Sentry.setUser(null);
  },

  addBreadcrumb(breadcrumb: Breadcrumb): void {
    if (!config.enabled) return;
    // Replace with: Sentry.addBreadcrumb(breadcrumb);
  },
};
