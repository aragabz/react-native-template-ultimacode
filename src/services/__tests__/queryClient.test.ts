import { bindOnlineManager, createQueryClient } from '../queryClient';

describe('QueryClient configuration', () => {
  it('creates a QueryClient instance', () => {
    const client = createQueryClient();
    expect(client).toBeDefined();
    expect(client.getDefaultOptions).toBeDefined();
  });

  it('sets staleTime to avoid unnecessary refetches', () => {
    const client = createQueryClient();
    const defaults = client.getDefaultOptions();
    expect(defaults.queries?.staleTime).toBeGreaterThan(0);
  });

  it('sets gcTime (garbage collection) for cache retention', () => {
    const client = createQueryClient();
    const defaults = client.getDefaultOptions();
    expect(defaults.queries?.gcTime).toBeGreaterThan(0);
  });

  it('configures retry to a reasonable count', () => {
    const client = createQueryClient();
    const defaults = client.getDefaultOptions();
    expect(defaults.queries?.retry).toBe(2);
  });

  it('disables refetchOnWindowFocus for mobile', () => {
    const client = createQueryClient();
    const defaults = client.getDefaultOptions();
    expect(defaults.queries?.refetchOnWindowFocus).toBe(false);
  });

  it('keeps refetchOnReconnect enabled (driven by NetInfo via onlineManager)', () => {
    const client = createQueryClient();
    const defaults = client.getDefaultOptions();
    expect(defaults.queries?.refetchOnReconnect).toBeUndefined();
  });

  it('bindOnlineManager subscribes to NetInfo', () => {
    const NetInfo = require('@react-native-community/netinfo');
    bindOnlineManager();
    expect(NetInfo.addEventListener).toHaveBeenCalled();
  });
});
