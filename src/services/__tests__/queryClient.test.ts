import { createQueryClient } from '../queryClient';

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

  it('disables refetchOnReconnect by default (handled by NetInfo)', () => {
    const client = createQueryClient();
    const defaults = client.getDefaultOptions();
    expect(defaults.queries?.refetchOnReconnect).toBe(false);
  });
});
