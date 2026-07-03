import React from 'react';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, waitFor } from '@testing-library/react-native';
import { DemoScreen } from '../DemoScreen';

jest.mock('axios');

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
    (axios.get as jest.Mock).mockResolvedValue({ data: mockPosts });

    const { getByText } = await render(<DemoScreen />, { wrapper });

    expect(getByText(/Counter:/i)).toBeTruthy();

    expect(getByText(/Theme Mode:/i)).toBeTruthy();

    await waitFor(() => expect(getByText('Test Post')).toBeTruthy());
  });
});
