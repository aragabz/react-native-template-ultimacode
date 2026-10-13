import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { ExamplesScreen } from '../ExamplesScreen';

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

describe('ExamplesScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all architectural components', async () => {
    const { getByText } = await render(<ExamplesScreen />);

    expect(getByText(/Counter:/i)).toBeTruthy();

    expect(getByText(/Theme Mode:/i)).toBeTruthy();

    await waitFor(() => expect(getByText('Test Post')).toBeTruthy());
  });
});
