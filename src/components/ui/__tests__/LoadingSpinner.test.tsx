import React from 'react';
import { render } from '@testing-library/react-native';
import { LoadingSpinner } from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders without crashing', async () => {
    const { toJSON } = await render(<LoadingSpinner />);
    expect(toJSON()).toBeTruthy();
  });

  it('renders message when provided', async () => {
    const { getByText } = await render(<LoadingSpinner message="Loading data..." />);
    expect(getByText('Loading data...')).toBeTruthy();
  });

  it('does not render message when not provided', async () => {
    const { queryByText } = await render(<LoadingSpinner />);
    expect(queryByText('Loading data...')).toBeNull();
  });
});
