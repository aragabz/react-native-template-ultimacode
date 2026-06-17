import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import { DemoScreen } from '../DemoScreen';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';

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
  });

  it('renders all architectural components', async () => {
    // Mock posts API
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue([{ id: 1, title: 'Test Post' }]),
    });

    render(<DemoScreen />, { wrapper });

    // Check for Counter (Zustand)
    expect(screen.getByText(/Counter:/i)).toBeTruthy();

    // Check for Theme (Zustand)
    expect(screen.getByText(/Theme:/i)).toBeTruthy();

    // Check for Posts (TanStack Query)
    await waitFor(() => expect(screen.getByText('Test Post')).toBeTruthy());
  });
});
