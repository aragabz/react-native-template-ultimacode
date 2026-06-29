import React from 'react';
import { render } from '@testing-library/react-native';
import { OfflineBanner } from '../OfflineBanner';

// Mock the hook to control network state in tests
let mockIsConnected = true;
jest.mock('@hooks/useNetworkStatus', () => ({
  useNetworkStatus: () => ({
    isConnected: mockIsConnected,
    type: mockIsConnected ? 'wifi' : 'none',
  }),
}));

describe('OfflineBanner', () => {
  beforeEach(() => {
    mockIsConnected = true;
  });

  it('renders nothing when connected', async () => {
    mockIsConnected = true;
    const { queryByText } = await render(<OfflineBanner />);
    expect(queryByText(/offline/i)).toBeNull();
  });

  it('shows offline message when disconnected', async () => {
    mockIsConnected = false;
    const { getByText } = await render(<OfflineBanner />);
    expect(getByText(/no internet connection/i)).toBeTruthy();
  });
});
