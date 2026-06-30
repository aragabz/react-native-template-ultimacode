import React from 'react';
import { render } from '@testing-library/react-native';
import { OptimizedImage } from '@components/ui/OptimizedImage';

jest.mock('expo-image', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    Image: React.forwardRef((props: Record<string, unknown>, ref: React.Ref<typeof View>) => (
      <View ref={ref} testID={props.testID as string} {...props} />
    )),
  };
});

describe('OptimizedImage', () => {
  it('renders without crashing', async () => {
    const { getByTestId } = await render(
      <OptimizedImage source="https://example.com/image.jpg" testID="test-image" />,
    );
    expect(getByTestId('test-image')).toBeTruthy();
  });

  it('applies custom style', async () => {
    const { getByTestId } = await render(
      <OptimizedImage
        source="https://example.com/image.jpg"
        testID="styled-image"
        style={{ width: 100, height: 100 }}
      />,
    );
    expect(getByTestId('styled-image')).toBeTruthy();
  });

  it('passes contentFit prop', async () => {
    const { getByTestId } = await render(
      <OptimizedImage
        source="https://example.com/image.jpg"
        testID="cover-image"
        contentFit="cover"
      />,
    );
    expect(getByTestId('cover-image').props.contentFit).toBe('cover');
  });

  it('passes placeholder prop', async () => {
    const { getByTestId } = await render(
      <OptimizedImage
        source="https://example.com/image.jpg"
        testID="placeholder-image"
        placeholder="https://example.com/placeholder.jpg"
      />,
    );
    expect(getByTestId('placeholder-image').props.placeholder).toBe(
      'https://example.com/placeholder.jpg',
    );
  });

  it('sets transition by default', async () => {
    const { getByTestId } = await render(
      <OptimizedImage source="https://example.com/image.jpg" testID="transition-image" />,
    );
    expect(getByTestId('transition-image').props.transition).toBeDefined();
  });
});
