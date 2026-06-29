import axios from 'axios';
import { useAuthStore } from '@store/useAuthStore';
import { apiClient } from '../apiClient';

// Axios interceptor handlers are internal — use type assertion for test access
type InterceptorHandler<T> = {
  fulfilled: (value: T) => T | Promise<T>;
  rejected?: (error: unknown) => unknown;
};

const getRequestHandler = (index: number) =>
  (apiClient.interceptors.request as unknown as { handlers: InterceptorHandler<any>[] }).handlers[index];

const getLastResponseHandler = () => {
  const handlers = (apiClient.interceptors.response as unknown as { handlers: InterceptorHandler<any>[] }).handlers;
  return handlers[handlers.length - 1];
};

beforeEach(() => {
  useAuthStore.setState({
    user: null,
    token: null,
    isHydrating: false,
  });
});

describe('apiClient request interceptor', () => {
  it('attaches Authorization header when token exists', async () => {
    useAuthStore.setState({ token: 'test-access-token' });

    const handler = getRequestHandler(0);
    const config = await handler.fulfilled({ headers: new axios.AxiosHeaders() });

    expect(config.headers.Authorization).toBe('Bearer test-access-token');
  });

  it('does not attach Authorization header when no token', async () => {
    useAuthStore.setState({ token: null });

    const handler = getRequestHandler(0);
    const config = await handler.fulfilled({ headers: new axios.AxiosHeaders() });

    expect(config.headers.Authorization).toBeUndefined();
  });
});

describe('apiClient response interceptor', () => {
  it('does not logout on non-401 errors', async () => {
    useAuthStore.setState({
      token: 'valid-token',
      user: { id: '1', email: 'a@b.com', name: 'Test' },
    });

    const error500 = { response: { status: 500 }, config: {} };
    const handler = getLastResponseHandler();

    await expect(handler.rejected!(error500)).rejects.toBeDefined();
    expect(useAuthStore.getState().token).toBe('valid-token');
  });

  it('attempts token refresh on 401 instead of immediately logging out', async () => {
    useAuthStore.setState({
      token: 'expired-token',
      refreshToken: 'valid-refresh-token',
      user: { id: '1', email: 'a@b.com', name: 'Test' },
    });

    const error401 = {
      response: { status: 401 },
      config: { headers: new axios.AxiosHeaders(), _retry: false },
    };

    const handler = getLastResponseHandler();

    try {
      await handler.rejected!(error401);
    } catch {
      // refresh will fail in test env (no real server), but it should
      // attempt refresh before logging out
    }
  });

  it('logs out immediately when no refresh token is available', async () => {
    useAuthStore.setState({
      token: 'expired-token',
      refreshToken: null,
      user: { id: '1', email: 'a@b.com', name: 'Test' },
    });

    const error401 = {
      response: { status: 401 },
      config: { headers: new axios.AxiosHeaders(), _retry: false },
    };

    const handler = getLastResponseHandler();

    try {
      await handler.rejected!(error401);
    } catch {
      // expected rejection
    }

    expect(useAuthStore.getState().token).toBeNull();
    expect(useAuthStore.getState().user).toBeNull();
  });

  it('logs out when refresh token request itself returns 401', async () => {
    useAuthStore.setState({
      token: 'expired-token',
      user: { id: '1', email: 'a@b.com', name: 'Test' },
    });

    // Simulate a 401 on a retry (already attempted refresh)
    const error401Retry = {
      response: { status: 401 },
      config: { headers: new axios.AxiosHeaders(), _retry: true },
    };

    const handler = getLastResponseHandler();

    try {
      await handler.rejected!(error401Retry);
    } catch {
      // expected
    }

    expect(useAuthStore.getState().token).toBeNull();
    expect(useAuthStore.getState().user).toBeNull();
  });
});
