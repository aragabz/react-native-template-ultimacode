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
    expect(() =>
      crashReporting.captureException(new Error('test')),
    ).not.toThrow();
  });

  it('captureMessage does not throw when called with string', () => {
    expect(() => crashReporting.captureMessage('test message')).not.toThrow();
  });

  it('setUser does not throw when called with user info', () => {
    expect(() =>
      crashReporting.setUser({ id: '1', email: 'test@test.com' }),
    ).not.toThrow();
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

  describe('enabled flag', () => {
    let log: jest.SpyInstance;
    let error: jest.SpyInstance;

    beforeEach(() => {
      log = jest.spyOn(console, 'log').mockImplementation(() => {});
      error = jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
      log.mockRestore();
      error.mockRestore();
    });

    it('reports nothing while disabled', () => {
      initCrashReporting({ dsn: '', enabled: false });
      log.mockClear();
      crashReporting.captureException(new Error('boom'));
      crashReporting.captureMessage('hello');
      crashReporting.setUser({ id: '1' });
      expect(log).not.toHaveBeenCalled();
      expect(error).not.toHaveBeenCalled();
    });

    it('reports exceptions, messages and users once enabled', () => {
      initCrashReporting({
        dsn: 'https://test@sentry.io/1',
        enabled: true,
        environment: 'test',
      });
      log.mockClear();
      crashReporting.captureException(new Error('boom'), { screen: 'Home' });
      crashReporting.captureMessage('careful', 'warning');
      crashReporting.setUser({ id: '1' });
      crashReporting.clearUser();
      crashReporting.addBreadcrumb({ category: 'nav', message: 'Home' });
      expect(error).toHaveBeenCalledWith(
        '[CrashReporting] Exception:',
        'boom',
        { screen: 'Home' },
      );
      expect(log).toHaveBeenCalledWith('[CrashReporting] warning: careful');
      expect(log).toHaveBeenCalledWith('[CrashReporting] User set:', '1');
    });
  });
});
