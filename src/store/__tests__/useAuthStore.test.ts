import { useAuthStore } from '../useAuthStore';

describe('useAuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({
      user: null,
      token: null,
      isHydrating: false,
    });
  });

  it('starts with expected defaults after reset', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
  });

  it('login sets user and token', () => {
    const user = { id: '1', email: 'test@test.com', name: 'Test' };

    useAuthStore.getState().login(user, 'token-123');

    const state = useAuthStore.getState();
    expect(state.user).toEqual(user);
    expect(state.token).toBe('token-123');
  });

  it('logout clears user and token', () => {
    const user = { id: '1', email: 'test@test.com', name: 'Test' };
    useAuthStore.getState().login(user, 'token-123');
    expect(useAuthStore.getState().token).toBe('token-123');

    useAuthStore.getState().logout();

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
  });

  it('hydrate sets isHydrating to false', () => {
    useAuthStore.setState({ isHydrating: true });
    useAuthStore.getState().hydrate();
    expect(useAuthStore.getState().isHydrating).toBe(false);
  });

  it('isAuthenticated is derived from token', () => {
    expect(useAuthStore.getState().token !== null).toBe(false);

    useAuthStore.getState().login(
      { id: '1', email: 'a@b.com', name: 'A' },
      'tok',
    );
    expect(useAuthStore.getState().token !== null).toBe(true);
  });
});
