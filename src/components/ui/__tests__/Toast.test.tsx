import React from 'react';
import { render, act } from '@testing-library/react-native';
import { Toast, useToastStore } from '../Toast';

describe('Toast', () => {
  beforeEach(() => {
    useToastStore.setState({ visible: false, message: '', type: 'info' });
  });

  it('renders nothing when not visible', async () => {
    const { queryByText } = await render(<Toast />);
    expect(queryByText(/.+/)).toBeNull();
  });

  it('shows message when visible', async () => {
    useToastStore.setState({ visible: true, message: 'Success!', type: 'success' });

    const { getByText } = await render(<Toast />);
    expect(getByText('Success!')).toBeTruthy();
  });

  it('show() sets visible and message', () => {
    useToastStore.getState().show('Hello', 'info');

    const state = useToastStore.getState();
    expect(state.visible).toBe(true);
    expect(state.message).toBe('Hello');
    expect(state.type).toBe('info');
  });

  it('show() defaults type to info', () => {
    useToastStore.getState().show('Default type');

    expect(useToastStore.getState().type).toBe('info');
  });

  it('hide() sets visible to false', () => {
    useToastStore.getState().show('Visible');
    useToastStore.getState().hide();

    expect(useToastStore.getState().visible).toBe(false);
  });
});
