import { analytics, initAnalytics } from '@services/analytics';

describe('Analytics Service', () => {
  beforeEach(() => {
    initAnalytics({ enabled: false });
  });

  it('exports an analytics object with expected methods', () => {
    expect(analytics).toHaveProperty('track');
    expect(analytics).toHaveProperty('screen');
    expect(analytics).toHaveProperty('identify');
    expect(analytics).toHaveProperty('reset');
  });

  it('track does not throw when called with event name', () => {
    expect(() => analytics.track('button_press')).not.toThrow();
  });

  it('track does not throw with properties', () => {
    expect(() => analytics.track('purchase', { amount: 9.99, currency: 'USD' })).not.toThrow();
  });

  it('screen does not throw when called with screen name', () => {
    expect(() => analytics.screen('HomeScreen')).not.toThrow();
  });

  it('identify does not throw when called with userId', () => {
    expect(() => analytics.identify('user-123', { plan: 'pro' })).not.toThrow();
  });

  it('reset does not throw', () => {
    expect(() => analytics.reset()).not.toThrow();
  });

  it('initAnalytics sets up configuration without throwing', () => {
    expect(() => initAnalytics({ enabled: true })).not.toThrow();
  });
});
