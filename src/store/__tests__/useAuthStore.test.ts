import { useAuthStore, selectIsAuthenticated, selectUser, selectToken, selectIsHydrating } from '../useAuthStore';

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      token: null,
      refreshToken: null,
      isHydrating: false,
    });
  });

  it('starts with expected defaults after reset', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.refreshToken).toBeNull();
  });

  it('login sets user, token, and refreshToken', () => {
    const user = { id: '1', email: 'test@test.com', name: 'Test' };

    useAuthStore.getState().login(user, 'token-123', 'refresh-456');

    const state = useAuthStore.getState();
    expect(state.user).toEqual(user);
    expect(state.token).toBe('token-123');
    expect(state.refreshToken).toBe('refresh-456');
  });

  it('login without refreshToken sets it to null', () => {
    const user = { id: '1', email: 'test@test.com', name: 'Test' };

    useAuthStore.getState().login(user, 'token-123');

    const state = useAuthStore.getState();
    expect(state.token).toBe('token-123');
    expect(state.refreshToken).toBeNull();
  });

  it('logout clears user, token, and refreshToken', () => {
    const user = { id: '1', email: 'test@test.com', name: 'Test' };
    useAuthStore.getState().login(user, 'token-123', 'refresh-456');

    useAuthStore.getState().logout();

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.refreshToken).toBeNull();
  });

  it('hydrate sets isHydrating to false', () => {
    useAuthStore.setState({ isHydrating: true });
    useAuthStore.getState().hydrate();
    expect(useAuthStore.getState().isHydrating).toBe(false);
  });

  it('setTokens updates token and refreshToken', () => {
    useAuthStore.getState().login(
      { id: '1', email: 'a@b.com', name: 'A' },
      'old-token',
      'old-refresh',
    );

    useAuthStore.getState().setTokens('new-token', 'new-refresh');

    const state = useAuthStore.getState();
    expect(state.token).toBe('new-token');
    expect(state.refreshToken).toBe('new-refresh');
    expect(state.user).not.toBeNull();
  });

  it('setTokens without refreshToken preserves existing', () => {
    useAuthStore.getState().login(
      { id: '1', email: 'a@b.com', name: 'A' },
      'old-token',
      'existing-refresh',
    );

    useAuthStore.getState().setTokens('new-token');

    const state = useAuthStore.getState();
    expect(state.token).toBe('new-token');
    expect(state.refreshToken).toBe('existing-refresh');
  });

  describe('selectors', () => {
    it('selectIsAuthenticated returns true when token exists', () => {
      expect(selectIsAuthenticated(useAuthStore.getState())).toBe(false);

      useAuthStore.getState().login(
        { id: '1', email: 'a@b.com', name: 'A' },
        'tok',
      );
      expect(selectIsAuthenticated(useAuthStore.getState())).toBe(true);
    });

    it('selectUser returns the current user', () => {
      const user = { id: '1', email: 'a@b.com', name: 'A' };
      expect(selectUser(useAuthStore.getState())).toBeNull();

      useAuthStore.getState().login(user, 'tok');
      expect(selectUser(useAuthStore.getState())).toEqual(user);
    });

    it('selectToken returns the current token', () => {
      expect(selectToken(useAuthStore.getState())).toBeNull();

      useAuthStore.getState().login(
        { id: '1', email: 'a@b.com', name: 'A' },
        'my-token',
      );
      expect(selectToken(useAuthStore.getState())).toBe('my-token');
    });

    it('selectIsHydrating returns hydration state', () => {
      useAuthStore.setState({ isHydrating: true });
      expect(selectIsHydrating(useAuthStore.getState())).toBe(true);

      useAuthStore.setState({ isHydrating: false });
      expect(selectIsHydrating(useAuthStore.getState())).toBe(false);
    });
  });
});
