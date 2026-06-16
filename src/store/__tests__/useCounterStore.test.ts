import { renderHook, act } from '@testing-library/react-native';
import { useCounterStore } from '../useCounterStore';

describe('useCounterStore', () => {
  it('should have initial count of 0', async () => {
    const { result } = await renderHook(() => useCounterStore());
    expect(result.current.count).toBe(0);
  });

  it('should increment and decrement count', async () => {
    const { result } = await renderHook(() => useCounterStore());
    
    await act(async () => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
    
    await act(async () => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(0);
  });

  it('should reset count', async () => {
    const { result } = await renderHook(() => useCounterStore());
    
    await act(async () => {
      result.current.increment();
    });
    expect(result.current.count).toBe(1);
    
    await act(async () => {
      result.current.reset();
    });
    expect(result.current.count).toBe(0);
  });
});
