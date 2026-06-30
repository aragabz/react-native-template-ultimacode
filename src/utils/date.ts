/**
 * Date/time utility helpers.
 */

/**
 * Formats a date to a human-readable relative string (e.g., "2 hours ago").
 */
export function timeAgo(date: Date | string | number): string {
  const now = Date.now();
  const past = new Date(date).getTime();
  const diffMs = now - past;

  if (diffMs < 0) return 'just now';

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;

  return new Date(date).toLocaleDateString();
}

/**
 * Formats a date to ISO date string (YYYY-MM-DD).
 */
export function toISODate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Checks if a date is today.
 */
export function isToday(date: Date | string | number): boolean {
  const d = new Date(date);
  const today = new Date();
  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  );
}
