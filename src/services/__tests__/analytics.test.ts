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
    expect(() =>
      analytics.track('purchase', { amount: 9.99, currency: 'USD' }),
    ).not.toThrow();
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

  describe('enabled flag', () => {
    let log: jest.SpyInstance;

    beforeEach(() => {
      log = jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    afterEach(() => log.mockRestore());

    it('forwards nothing while disabled', () => {
      initAnalytics({ enabled: false });
      log.mockClear();
      analytics.track('event');
      analytics.screen('Home');
      analytics.identify('user-1');
      analytics.reset();
      expect(log).not.toHaveBeenCalled();
    });

    it('forwards every call once enabled', () => {
      initAnalytics({ enabled: true });
      log.mockClear();
      analytics.track('event', { a: 1 });
      analytics.screen('Home');
      analytics.identify('user-1');
      analytics.reset();
      expect(log).toHaveBeenCalledTimes(4);
      expect(log).toHaveBeenCalledWith('[Analytics] Track:', 'event', { a: 1 });
    });
  });
});
