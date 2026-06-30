import {
  isValidEmail,
  isValidPassword,
  isStrongPassword,
  isValidUrl,
  isValidPhone,
  isNonEmpty,
} from '@utils/validators';

describe('validators', () => {
  describe('isValidEmail', () => {
    it('accepts valid emails', () => {
      expect(isValidEmail('user@example.com')).toBe(true);
      expect(isValidEmail('test.name+tag@domain.co.uk')).toBe(true);
    });

    it('rejects invalid emails', () => {
      expect(isValidEmail('')).toBe(false);
      expect(isValidEmail('notanemail')).toBe(false);
      expect(isValidEmail('@missing.user')).toBe(false);
    });

    it('trims whitespace', () => {
      expect(isValidEmail(' user@example.com ')).toBe(true);
    });
  });

  describe('isValidPassword', () => {
    it('accepts passwords with 8+ chars', () => {
      expect(isValidPassword('12345678')).toBe(true);
      expect(isValidPassword('longpassword')).toBe(true);
    });

    it('rejects short passwords', () => {
      expect(isValidPassword('1234567')).toBe(false);
      expect(isValidPassword('')).toBe(false);
    });
  });

  describe('isStrongPassword', () => {
    it('accepts strong passwords', () => {
      expect(isStrongPassword('Passw0rd!')).toBe(true);
      expect(isStrongPassword('Str0ng@Pass')).toBe(true);
    });

    it('rejects weak passwords', () => {
      expect(isStrongPassword('password')).toBe(false);
      expect(isStrongPassword('12345678')).toBe(false);
      expect(isStrongPassword('NoSpecial1')).toBe(false);
    });
  });

  describe('isValidUrl', () => {
    it('accepts valid URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://localhost:3000')).toBe(true);
    });

    it('rejects invalid URLs', () => {
      expect(isValidUrl('ftp://example.com')).toBe(false);
      expect(isValidUrl('not a url')).toBe(false);
    });
  });

  describe('isValidPhone', () => {
    it('accepts valid international numbers', () => {
      expect(isValidPhone('+1234567890')).toBe(true);
      expect(isValidPhone('+44 7911 123456')).toBe(true);
    });

    it('rejects invalid numbers', () => {
      expect(isValidPhone('')).toBe(false);
      expect(isValidPhone('abc')).toBe(false);
    });
  });

  describe('isNonEmpty', () => {
    it('returns true for non-empty strings', () => {
      expect(isNonEmpty('hello')).toBe(true);
    });

    it('returns false for empty/whitespace/null', () => {
      expect(isNonEmpty('')).toBe(false);
      expect(isNonEmpty('   ')).toBe(false);
      expect(isNonEmpty(null)).toBe(false);
      expect(isNonEmpty(undefined)).toBe(false);
    });
  });
});
