import { renderHook, waitFor } from '@testing-library/react-native';
import { usePosts } from '../usePosts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

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
  });

  it('should fetch posts successfully', async () => {
    const mockPosts = [{ id: 1, title: 'Post 1' }];
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockPosts),
    });

    const { result } = renderHook(() => usePosts(), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockPosts);
  });

  it('should handle error when fetching fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    const { result } = renderHook(() => usePosts(), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
