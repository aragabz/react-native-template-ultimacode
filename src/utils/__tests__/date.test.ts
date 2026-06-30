import { timeAgo, toISODate, isToday } from '@utils/date';

describe('date utils', () => {
  describe('timeAgo', () => {
    it('returns "just now" for very recent dates', () => {
      expect(timeAgo(new Date())).toBe('just now');
    });

    it('returns minutes ago', () => {
      const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000);
      expect(timeAgo(fiveMinAgo)).toBe('5 minutes ago');
    });

    it('returns singular minute', () => {
      const oneMinAgo = new Date(Date.now() - 61 * 1000);
      expect(timeAgo(oneMinAgo)).toBe('1 minute ago');
    });

    it('returns hours ago', () => {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
      expect(timeAgo(twoHoursAgo)).toBe('2 hours ago');
    });

    it('returns days ago', () => {
      const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
      expect(timeAgo(threeDaysAgo)).toBe('3 days ago');
    });

    it('returns formatted date for old dates', () => {
      const old = new Date('2020-01-15');
      const result = timeAgo(old);
      expect(result).toContain('2020');
    });

    it('handles string input', () => {
      expect(timeAgo(new Date().toISOString())).toBe('just now');
    });

    it('handles future dates gracefully', () => {
      const future = new Date(Date.now() + 60000);
      expect(timeAgo(future)).toBe('just now');
    });
  });

  describe('toISODate', () => {
    it('formats date as YYYY-MM-DD', () => {
      const date = new Date('2024-03-15T10:30:00Z');
      expect(toISODate(date)).toBe('2024-03-15');
    });
  });

  describe('isToday', () => {
    it('returns true for today', () => {
      expect(isToday(new Date())).toBe(true);
    });

    it('returns false for yesterday', () => {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
      expect(isToday(yesterday)).toBe(false);
    });

    it('handles string dates', () => {
      expect(isToday(new Date().toISOString())).toBe(true);
    });
  });
});
