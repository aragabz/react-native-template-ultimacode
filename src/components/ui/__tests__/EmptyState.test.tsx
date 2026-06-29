import React from 'react';
import { render } from '@testing-library/react-native';
import { EmptyState } from '../EmptyState';
import { Button } from '../Button';

describe('EmptyState', () => {
  it('renders title', async () => {
    const { getByText } = await render(<EmptyState title="No Items" />);
    expect(getByText('No Items')).toBeTruthy();
  });

  it('renders message when provided', async () => {
    const { getByText } = await render(
      <EmptyState title="No Items" message="Try adding something" />,
    );
    expect(getByText('Try adding something')).toBeTruthy();
  });

  it('does not render message when not provided', async () => {
    const { queryByText } = await render(<EmptyState title="No Items" />);
    expect(queryByText('Try adding something')).toBeNull();
  });

  it('renders action when provided', async () => {
    const { getByText } = await render(
      <EmptyState
        title="No Items"
        action={<Button title="Add Item" onPress={() => {}} />}
      />,
    );
    expect(getByText('Add Item')).toBeTruthy();
  });
});
