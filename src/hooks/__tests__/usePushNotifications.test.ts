import { renderHook, act } from '@testing-library/react-native';
import { usePushNotifications } from '@hooks/usePushNotifications';

jest.mock('expo-notifications', () => ({
  getPermissionsAsync: jest.fn().mockResolvedValue({ status: 'undetermined' }),
  requestPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
  getExpoPushTokenAsync: jest.fn().mockResolvedValue({ data: 'ExponentPushToken[mock-token]' }),
  setNotificationHandler: jest.fn(),
  addNotificationReceivedListener: jest.fn(() => ({ remove: jest.fn() })),
  addNotificationResponseReceivedListener: jest.fn(() => ({ remove: jest.fn() })),
  AndroidImportance: { MAX: 5 },
  setNotificationChannelAsync: jest.fn(),
}));

jest.mock('expo-device', () => ({
  isDevice: true,
}));

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.Platform.OS = 'ios';
  return RN;
});

describe('usePushNotifications', () => {
  it('returns initial state with null token', async () => {
    const { result } = await renderHook(() => usePushNotifications());
    expect(result.current.expoPushToken).toBeNull();
    expect(result.current.permissionStatus).toBe('undetermined');
  });

  it('has a registerForPushNotifications function', async () => {
    const { result } = await renderHook(() => usePushNotifications());
    expect(typeof result.current.registerForPushNotifications).toBe('function');
  });

  it('registerForPushNotifications requests permission and gets token', async () => {
    const { result } = await renderHook(() => usePushNotifications());

    await act(async () => {
      await result.current.registerForPushNotifications();
    });

    expect(result.current.expoPushToken).toBe('ExponentPushToken[mock-token]');
    expect(result.current.permissionStatus).toBe('granted');
  });

  it('exposes notification state', async () => {
    const { result } = await renderHook(() => usePushNotifications());
    expect(result.current).toHaveProperty('notification');
  });
});
