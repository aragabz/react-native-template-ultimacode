import { userSchema, loginResponseSchema, postSchema, postsSchema } from '../schemas';

describe('API response Zod schemas', () => {
  describe('userSchema', () => {
    it('validates a correct user object', () => {
      const validUser = { id: '1', email: 'test@example.com', name: 'John' };
      expect(() => userSchema.parse(validUser)).not.toThrow();
    });

    it('rejects user with missing fields', () => {
      const invalid = { id: '1', email: 'test@example.com' };
      expect(() => userSchema.parse(invalid)).toThrow();
    });

    it('rejects user with invalid email format', () => {
      const invalid = { id: '1', email: 'not-an-email', name: 'John' };
      expect(() => userSchema.parse(invalid)).toThrow();
    });

    it('rejects user with empty name', () => {
      const invalid = { id: '1', email: 'test@example.com', name: '' };
      expect(() => userSchema.parse(invalid)).toThrow();
    });
  });

  describe('loginResponseSchema', () => {
    it('validates a correct login response', () => {
      const valid = {
        user: { id: '1', email: 'test@example.com', name: 'John' },
        token: 'jwt-token-here',
      };
      expect(() => loginResponseSchema.parse(valid)).not.toThrow();
    });

    it('rejects login response without token', () => {
      const invalid = {
        user: { id: '1', email: 'test@example.com', name: 'John' },
      };
      expect(() => loginResponseSchema.parse(invalid)).toThrow();
    });

    it('rejects login response with empty token', () => {
      const invalid = {
        user: { id: '1', email: 'test@example.com', name: 'John' },
        token: '',
      };
      expect(() => loginResponseSchema.parse(invalid)).toThrow();
    });

    it('rejects login response with invalid user', () => {
      const invalid = {
        user: { id: '1', email: 'bad' },
        token: 'jwt-token',
      };
      expect(() => loginResponseSchema.parse(invalid)).toThrow();
    });
  });

  describe('postSchema', () => {
    it('validates a correct post', () => {
      const valid = { userId: 1, id: 1, title: 'Hello', body: 'World' };
      expect(() => postSchema.parse(valid)).not.toThrow();
    });

    it('rejects post with missing title', () => {
      const invalid = { userId: 1, id: 1, body: 'World' };
      expect(() => postSchema.parse(invalid)).toThrow();
    });

    it('rejects post with non-number userId', () => {
      const invalid = { userId: 'abc', id: 1, title: 'Hello', body: 'World' };
      expect(() => postSchema.parse(invalid)).toThrow();
    });
  });

  describe('postsSchema', () => {
    it('validates an array of posts', () => {
      const valid = [
        { userId: 1, id: 1, title: 'A', body: 'B' },
        { userId: 2, id: 2, title: 'C', body: 'D' },
      ];
      expect(() => postsSchema.parse(valid)).not.toThrow();
    });

    it('rejects if any item in array is invalid', () => {
      const invalid = [
        { userId: 1, id: 1, title: 'A', body: 'B' },
        { userId: 'x', id: 2, title: 'C', body: 'D' },
      ];
      expect(() => postsSchema.parse(invalid)).toThrow();
    });

    it('validates an empty array', () => {
      expect(() => postsSchema.parse([])).not.toThrow();
    });
  });
});
