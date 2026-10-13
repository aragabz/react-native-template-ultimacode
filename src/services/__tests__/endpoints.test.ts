import { apiClient } from '../apiClient';
import { getProfile, login, logout, refreshTokens } from '../endpoints/auth';
import { getPostById, getPosts } from '../endpoints/posts';

jest.mock('../apiClient', () => ({
  apiClient: { get: jest.fn(), post: jest.fn() },
}));

const mockedGet = apiClient.get as jest.Mock;
const mockedPost = apiClient.post as jest.Mock;

const post = { userId: 1, id: 1, title: 'Title', body: 'Body' };
const user = { id: 'u1', email: 'jane@example.com', name: 'Jane' };

describe('posts endpoints', () => {
  afterEach(() => jest.clearAllMocks());

  it('getPosts accepts a plain array response', async () => {
    mockedGet.mockResolvedValue({ data: [post] });
    await expect(getPosts()).resolves.toEqual([post]);
    expect(mockedGet).toHaveBeenCalledWith('/posts');
  });

  it('getPosts accepts a dummyjson { posts } envelope', async () => {
    mockedGet.mockResolvedValue({ data: { posts: [post], total: 1 } });
    await expect(getPosts()).resolves.toEqual([post]);
  });

  it('getPosts rejects an unknown response shape', async () => {
    mockedGet.mockResolvedValue({ data: 'nope' });
    await expect(getPosts()).rejects.toThrow('Invalid posts response shape');
  });

  it('getPosts rejects posts that fail schema validation', async () => {
    mockedGet.mockResolvedValue({ data: [{ ...post, id: 'not-a-number' }] });
    await expect(getPosts()).rejects.toThrow();
  });

  it('getPostById fetches and validates a single post', async () => {
    mockedGet.mockResolvedValue({ data: post });
    await expect(getPostById(1)).resolves.toEqual(post);
    expect(mockedGet).toHaveBeenCalledWith('/posts/1');
  });
});

describe('auth endpoints', () => {
  afterEach(() => jest.clearAllMocks());

  it('login posts credentials and validates the response', async () => {
    mockedPost.mockResolvedValue({ data: { user, token: 'abc' } });
    await expect(
      login({ email: user.email, password: 'secret123' }),
    ).resolves.toEqual({
      user,
      token: 'abc',
    });
    expect(mockedPost).toHaveBeenCalledWith('/auth/login', {
      email: user.email,
      password: 'secret123',
    });
  });

  it('login rejects a response without a token', async () => {
    mockedPost.mockResolvedValue({ data: { user } });
    await expect(
      login({ email: user.email, password: 'secret123' }),
    ).rejects.toThrow();
  });

  it('refreshTokens validates the new token pair', async () => {
    mockedPost.mockResolvedValue({ data: { token: 't2', refreshToken: 'r2' } });
    await expect(refreshTokens('r1')).resolves.toEqual({
      token: 't2',
      refreshToken: 'r2',
    });
    expect(mockedPost).toHaveBeenCalledWith('/auth/refresh', {
      refreshToken: 'r1',
    });
  });

  it('refreshTokens rejects a response missing the refresh token', async () => {
    mockedPost.mockResolvedValue({ data: { token: 't2' } });
    await expect(refreshTokens('r1')).rejects.toThrow();
  });

  it('logout resolves with nothing', async () => {
    mockedPost.mockResolvedValue({ data: { ok: true } });
    await expect(logout()).resolves.toBeUndefined();
  });

  it('getProfile validates the user', async () => {
    mockedGet.mockResolvedValue({ data: user });
    await expect(getProfile()).resolves.toEqual(user);
  });
});
