import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { DemoScreen } from '../DemoScreen';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));

jest.mock('@api/hooks/usePosts', () => ({
  usePosts: () => ({
    data: [{ id: 1, userId: 1, title: 'Test Post', body: 'Body' }],
    isLoading: false,
    isError: false,
    error: null,
    refetch: jest.fn(),
  }),
}));

describe('DemoScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all architectural components', async () => {
    const { getByText } = await render(<DemoScreen />);

    expect(getByText(/Counter:/i)).toBeTruthy();

    expect(getByText(/Theme Mode:/i)).toBeTruthy();

    await waitFor(() => expect(getByText('Test Post')).toBeTruthy());
  });
});
