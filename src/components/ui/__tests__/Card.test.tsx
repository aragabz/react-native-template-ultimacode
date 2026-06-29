import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { Card } from '../Card';

describe('Card', () => {
  it('renders children', async () => {
    const { getByText } = await render(
      <Card><Text>Card Content</Text></Card>,
    );
    expect(getByText('Card Content')).toBeTruthy();
  });

  it('applies custom style', async () => {
    const { getByText } = await render(
      <Card style={{ marginTop: 20 }}><Text>Styled</Text></Card>,
    );
    expect(getByText('Styled')).toBeTruthy();
  });
});
