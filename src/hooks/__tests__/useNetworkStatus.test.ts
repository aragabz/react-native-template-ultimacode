import { renderHook, act, waitFor } from '@testing-library/react-native';
import NetInfo from '@react-native-community/netinfo';
import { useNetworkStatus } from '../useNetworkStatus';

// Override global jest.setup mock with test-specific mock
jest.mock('@react-native-community/netinfo', () => {
  let listener: ((state: any) => void) | null = null;
  return {
    addEventListener: jest.fn((callback: (state: any) => void) => {
      listener = callback;
      return () => {
        listener = null;
      };
    }),
    fetch: jest.fn().mockResolvedValue({
      isConnected: true,
      isInternetReachable: true,
      type: 'wifi',
    }),
    __emitChange: (state: any) => {
      if (listener) {
        listener(state);
      }
    },
  };
});

describe('useNetworkStatus', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns isConnected as true by default', async () => {
    const { result } = await renderHook(() => useNetworkStatus());
    expect(result.current.isConnected).toBe(true);
  });

  it('subscribes to NetInfo on mount', async () => {
    await renderHook(() => useNetworkStatus());
    expect(NetInfo.addEventListener).toHaveBeenCalledTimes(1);
  });

  it('updates isConnected when network goes offline', async () => {
    const { result } = await renderHook(() => useNetworkStatus());

    await act(() => {
      (NetInfo as any).__emitChange({
        isConnected: false,
        isInternetReachable: false,
        type: 'none',
      });
    });

    expect(result.current.isConnected).toBe(false);
  });

  it('updates isConnected when network comes back online', async () => {
    const { result } = await renderHook(() => useNetworkStatus());

    await act(() => {
      (NetInfo as any).__emitChange({
        isConnected: false,
        isInternetReachable: false,
        type: 'none',
      });
    });

    expect(result.current.isConnected).toBe(false);

    await act(() => {
      (NetInfo as any).__emitChange({
        isConnected: true,
        isInternetReachable: true,
        type: 'wifi',
      });
    });

    expect(result.current.isConnected).toBe(true);
  });

  it('exposes the network type', async () => {
    const { result } = await renderHook(() => useNetworkStatus());

    await act(() => {
      (NetInfo as any).__emitChange({
        isConnected: true,
        isInternetReachable: true,
        type: 'cellular',
      });
    });

    expect(result.current.type).toBe('cellular');
  });

  it('unsubscribes from NetInfo on unmount', async () => {
    const unsubscribe = jest.fn();
    (NetInfo.addEventListener as jest.Mock).mockReturnValueOnce(unsubscribe);

    const { unmount } = await renderHook(() => useNetworkStatus());

    await act(() => {
      unmount();
    });

    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });
});
