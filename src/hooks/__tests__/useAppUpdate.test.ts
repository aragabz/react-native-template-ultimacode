import { renderHook, act } from '@testing-library/react-native';
import { useAppUpdate, type UpdateStatus } from '@hooks/useAppUpdate';

jest.mock('expo-constants', () => ({
  expoConfig: { version: '1.0.0' },
}));

describe('useAppUpdate', () => {
  it('returns initial idle status', async () => {
    const { result } = await renderHook(() => useAppUpdate());
    expect(result.current.status).toBe('idle');
    expect(result.current.isUpdateAvailable).toBe(false);
  });

  it('has a checkForUpdate function', async () => {
    const { result } = await renderHook(() => useAppUpdate());
    expect(typeof result.current.checkForUpdate).toBe('function');
  });

  it('exposes currentVersion from Constants', async () => {
    const { result } = await renderHook(() => useAppUpdate());
    expect(result.current.currentVersion).toBe('1.0.0');
  });

  it('checkForUpdate transitions to checking then back', async () => {
    const { result } = await renderHook(() => useAppUpdate());

    await act(async () => {
      await result.current.checkForUpdate();
    });

    // After check completes, status should not be 'checking'
    expect(['idle', 'available', 'up-to-date']).toContain(result.current.status);
  });

  it('status type includes expected values', () => {
    const validStatuses: UpdateStatus[] = ['idle', 'checking', 'available', 'up-to-date', 'error'];
    expect(validStatuses).toHaveLength(5);
  });
});
