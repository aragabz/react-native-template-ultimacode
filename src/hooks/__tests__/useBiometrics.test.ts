import { renderHook, act } from '@testing-library/react-native';
import { useBiometrics } from '@hooks/useBiometrics';

jest.mock('expo-local-authentication', () => ({
  hasHardwareAsync: jest.fn().mockResolvedValue(true),
  isEnrolledAsync: jest.fn().mockResolvedValue(true),
  authenticateAsync: jest.fn().mockResolvedValue({ success: true }),
  AuthenticationType: { FINGERPRINT: 1, FACIAL_RECOGNITION: 2, IRIS: 3 },
  supportedAuthenticationTypesAsync: jest.fn().mockResolvedValue([1, 2]),
}));

describe('useBiometrics', () => {
  it('returns initial state', async () => {
    const { result } = await renderHook(() => useBiometrics());
    expect(result.current.isAvailable).toBe(false);
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('has an authenticate function', async () => {
    const { result } = await renderHook(() => useBiometrics());
    expect(typeof result.current.authenticate).toBe('function');
  });

  it('has a checkAvailability function', async () => {
    const { result } = await renderHook(() => useBiometrics());
    expect(typeof result.current.checkAvailability).toBe('function');
  });

  it('checkAvailability updates isAvailable', async () => {
    const { result } = await renderHook(() => useBiometrics());

    await act(async () => {
      await result.current.checkAvailability();
    });

    expect(result.current.isAvailable).toBe(true);
  });

  it('authenticate returns success and sets isAuthenticated', async () => {
    const { result } = await renderHook(() => useBiometrics());

    await act(async () => {
      const success = await result.current.authenticate();
      expect(success).toBe(true);
    });

    expect(result.current.isAuthenticated).toBe(true);
  });
});
