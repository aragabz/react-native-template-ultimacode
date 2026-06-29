import React from 'react';
import { apiClient } from '@api/apiClient';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen, waitFor } from '@testing-library/react-native';
import { DemoScreen } from '../DemoScreen';

jest.mock('@api/apiClient', () => ({
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
  <QueryClientProvider client={queryClient}>
    <NavigationContainer>{children}</NavigationContainer>
  </QueryClientProvider>
);

describe('DemoScreen', () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  it('renders all architectural components', async () => {
    const mockPosts = [{ id: 1, userId: 1, title: 'Test Post', body: 'Body' }];
    (apiClient.get as jest.Mock).mockResolvedValue({ data: mockPosts });

    const { getByText } = await render(<DemoScreen />, { wrapper });

    // Check for Counter (Zustand)
    expect(getByText(/Counter:/i)).toBeTruthy();

    // Check for Theme (Zustand)
    expect(getByText(/Theme Mode:/i)).toBeTruthy();

    // Check for Posts (TanStack Query)
    await waitFor(() => expect(getByText('Test Post')).toBeTruthy());
  });
});
