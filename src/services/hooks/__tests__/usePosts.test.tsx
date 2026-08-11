import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-native';
import { apiClient } from '../../apiClient';
import { usePosts } from '../usePosts';

jest.mock('../../apiClient', () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  },
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('usePosts', () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  it('should fetch posts successfully', async () => {
    const mockPosts = [{ id: 1, userId: 1, title: 'Post 1', body: 'Body 1' }];
    (apiClient.get as jest.Mock).mockResolvedValue({ data: mockPosts });

    const { result } = await renderHook(() => usePosts(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockPosts);
  });

  it('should handle error when fetching fails', async () => {
    (apiClient.get as jest.Mock).mockRejectedValue(new Error('Network error'));

    const { result } = await renderHook(() => usePosts(), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
