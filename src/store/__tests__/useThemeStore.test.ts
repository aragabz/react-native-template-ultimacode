import { renderHook, act } from '@testing-library/react-native';
import { useThemeStore } from '../useThemeStore';

describe('useThemeStore', () => {
  it('should have initial light theme', async () => {
    const { result } = await renderHook(() => useThemeStore());
    expect(result.current.theme).toBe('light');
  });

  it('should toggle theme', async () => {
    const { result } = await renderHook(() => useThemeStore());
    
    await act(async () => {
      result.current.toggleTheme();
    });
    
    expect(result.current.theme).toBe('dark');
    
    await act(async () => {
      result.current.toggleTheme();
    });
    
    expect(result.current.theme).toBe('light');
  });
});
