import { truncate, capitalize, titleCase, generateId } from '@utils/string';

describe('string utils', () => {
  describe('truncate', () => {
    it('returns original string if under maxLength', () => {
      expect(truncate('hello', 10)).toBe('hello');
    });

    it('truncates and adds suffix', () => {
      expect(truncate('hello world', 8)).toBe('hello...');
    });

    it('uses custom suffix', () => {
      expect(truncate('hello world', 8, '…')).toBe('hello w…');
    });

    it('handles exact length', () => {
      expect(truncate('hello', 5)).toBe('hello');
    });
  });

  describe('capitalize', () => {
    it('capitalizes first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    it('handles empty string', () => {
      expect(capitalize('')).toBe('');
    });

    it('handles already capitalized', () => {
      expect(capitalize('Hello')).toBe('Hello');
    });
  });

  describe('titleCase', () => {
    it('capitalizes each word', () => {
      expect(titleCase('hello world')).toBe('Hello World');
    });

    it('handles single word', () => {
      expect(titleCase('hello')).toBe('Hello');
    });
  });

  describe('generateId', () => {
    it('generates string of default length 12', () => {
      expect(generateId()).toHaveLength(12);
    });

    it('generates string of custom length', () => {
      expect(generateId(8)).toHaveLength(8);
    });

    it('generates unique IDs', () => {
      const ids = new Set(Array.from({ length: 100 }, () => generateId()));
      expect(ids.size).toBe(100);
    });

    it('contains only alphanumeric chars', () => {
      const id = generateId(50);
      expect(id).toMatch(/^[a-zA-Z0-9]+$/);
    });
  });
});
