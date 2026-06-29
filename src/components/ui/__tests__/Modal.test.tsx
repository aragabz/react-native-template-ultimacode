import React from 'react';
import { Text } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { Modal } from '../Modal';

describe('Modal', () => {
  it('renders children when visible', async () => {
    const { getByText } = await render(
      <Modal visible={true} onClose={() => {}}>
        <Text>Modal Content</Text>
      </Modal>,
    );
    expect(getByText('Modal Content')).toBeTruthy();
  });

  it('renders title when provided', async () => {
    const { getByText } = await render(
      <Modal visible={true} onClose={() => {}} title="My Modal">
        <Text>Body</Text>
      </Modal>,
    );
    expect(getByText('My Modal')).toBeTruthy();
  });

  it('does not render title when not provided', async () => {
    const { queryByText } = await render(
      <Modal visible={true} onClose={() => {}}>
        <Text>Body</Text>
      </Modal>,
    );
    expect(queryByText('X')).toBeNull();
  });

  it('calls onClose when close button is pressed', async () => {
    const onClose = jest.fn();
    const { getByText } = await render(
      <Modal visible={true} onClose={onClose} title="Title">
        <Text>Body</Text>
      </Modal>,
    );
    fireEvent.press(getByText('X'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
