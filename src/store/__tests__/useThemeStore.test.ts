import { renderHook, act } from '@testing-library/react-native';
import { useThemeStore } from '../useThemeStore';

describe('useThemeStore', () => {
  it('should have initial system mode', async () => {
    const { result } = await renderHook(() => useThemeStore());
    expect(result.current.mode).toBe('system');
  });

  it('should set theme mode', async () => {
    const { result } = await renderHook(() => useThemeStore());
    
    await act(async () => {
      result.current.setMode('dark');
    });
    expect(result.current.mode).toBe('dark');
    
    await act(async () => {
      result.current.setMode('light');
    });
    expect(result.current.mode).toBe('light');

    await act(async () => {
      result.current.setMode('system');
    });
    expect(result.current.mode).toBe('system');
  });
});
