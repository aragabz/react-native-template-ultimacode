import { crashReporting, initCrashReporting } from '@services/crashReporting';

describe('CrashReporting Service', () => {
  beforeEach(() => {
    initCrashReporting({ dsn: '', enabled: false });
  });

  it('exports a crashReporting object with expected methods', () => {
    expect(crashReporting).toHaveProperty('captureException');
    expect(crashReporting).toHaveProperty('captureMessage');
    expect(crashReporting).toHaveProperty('setUser');
    expect(crashReporting).toHaveProperty('clearUser');
    expect(crashReporting).toHaveProperty('addBreadcrumb');
  });

  it('captureException does not throw when called with Error', () => {
    expect(() => crashReporting.captureException(new Error('test'))).not.toThrow();
  });

  it('captureMessage does not throw when called with string', () => {
    expect(() => crashReporting.captureMessage('test message')).not.toThrow();
  });

  it('setUser does not throw when called with user info', () => {
    expect(() => crashReporting.setUser({ id: '1', email: 'test@test.com' })).not.toThrow();
  });

  it('clearUser does not throw', () => {
    expect(() => crashReporting.clearUser()).not.toThrow();
  });

  it('addBreadcrumb does not throw', () => {
    expect(() =>
      crashReporting.addBreadcrumb({ category: 'nav', message: 'Home' }),
    ).not.toThrow();
  });

  it('initCrashReporting sets up configuration without throwing', () => {
    expect(() =>
      initCrashReporting({ dsn: 'https://test@sentry.io/1', enabled: true }),
    ).not.toThrow();
  });
});
