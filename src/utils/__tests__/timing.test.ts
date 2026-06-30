import { debounce, throttle } from '@utils/timing';

jest.useFakeTimers();

describe('timing utils', () => {
  describe('debounce', () => {
    it('delays function execution', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 300);

      debounced();
      expect(fn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(300);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('resets timer on subsequent calls', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 300);

      debounced();
      jest.advanceTimersByTime(200);
      debounced();
      jest.advanceTimersByTime(200);
      expect(fn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('passes arguments to the function', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 100);

      debounced('hello', 42);
      jest.advanceTimersByTime(100);

      expect(fn).toHaveBeenCalledWith('hello', 42);
    });
  });

  describe('throttle', () => {
    it('executes immediately on first call', () => {
      const fn = jest.fn();
      const throttled = throttle(fn, 300);

      throttled();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('ignores calls within the limit', () => {
      const fn = jest.fn();
      const throttled = throttle(fn, 300);

      throttled();
      throttled();
      throttled();
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('allows execution after limit expires', () => {
      const fn = jest.fn();
      const throttled = throttle(fn, 300);

      throttled();
      jest.advanceTimersByTime(300);
      throttled();
      expect(fn).toHaveBeenCalledTimes(2);
    });
  });
});
