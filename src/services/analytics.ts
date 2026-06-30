/**
 * Analytics Service Abstraction
 *
 * This module provides a no-op implementation that can be replaced
 * with any analytics provider (Mixpanel, Amplitude, Firebase, Segment, etc.)
 *
 * To integrate a provider:
 * 1. Install the SDK (e.g., npx expo install @segment/analytics-react-native)
 * 2. Replace the no-op functions below with provider SDK calls
 */

interface AnalyticsConfig {
  enabled: boolean;
  debug?: boolean;
}

let config: AnalyticsConfig = {
  enabled: false,
};

export function initAnalytics(options: AnalyticsConfig): void {
  config = options;

  if (__DEV__) {
    // eslint-disable-next-line no-console
    console.log('[Analytics] Initialized:', { enabled: config.enabled });
  }
}

export const analytics = {
  track(event: string, properties?: Record<string, unknown>): void {
    if (!config.enabled) return;
    // Replace with: provider.track(event, properties);
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('[Analytics] Track:', event, properties);
    }
  },

  screen(name: string, properties?: Record<string, unknown>): void {
    if (!config.enabled) return;
    // Replace with: provider.screen(name, properties);
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('[Analytics] Screen:', name, properties);
    }
  },

  identify(userId: string, traits?: Record<string, unknown>): void {
    if (!config.enabled) return;
    // Replace with: provider.identify(userId, traits);
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('[Analytics] Identify:', userId, traits);
    }
  },

  reset(): void {
    if (!config.enabled) return;
    // Replace with: provider.reset();
    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.log('[Analytics] Reset');
    }
  },
};
