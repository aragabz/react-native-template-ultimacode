import { REGEX } from '@constants';

/**
 * Validates an email address.
 */
export function isValidEmail(email: string): boolean {
  return REGEX.EMAIL.test(email.trim());
}

/**
 * Validates password meets minimum length (8 chars).
 */
export function isValidPassword(password: string): boolean {
  return REGEX.PASSWORD_MIN_8.test(password);
}

/**
 * Validates a strong password (uppercase, lowercase, digit, special char, 8+).
 */
export function isStrongPassword(password: string): boolean {
  return REGEX.PASSWORD_STRONG.test(password);
}

/**
 * Validates a URL (http/https).
 */
export function isValidUrl(url: string): boolean {
  return REGEX.URL.test(url.trim());
}

/**
 * Validates an international phone number.
 */
export function isValidPhone(phone: string): boolean {
  return REGEX.PHONE_INTERNATIONAL.test(phone.replace(/[\s()-]/g, ''));
}

/**
 * Checks if a string is non-empty after trimming.
 */
export function isNonEmpty(value: string | null | undefined): boolean {
  return (value?.trim().length ?? 0) > 0;
}
