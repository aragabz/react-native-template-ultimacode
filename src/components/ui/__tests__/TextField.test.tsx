import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TextField } from '../TextField';

describe('TextField', () => {
  it('renders with label', async () => {
    const { getByText } = await render(
      <TextField label="Email" value="" onChangeText={() => {}} />,
    );
    expect(getByText('Email')).toBeTruthy();
  });

  it('renders without label when not provided', async () => {
    const { queryByText } = await render(
      <TextField value="hello" onChangeText={() => {}} />,
    );
    expect(queryByText('Email')).toBeNull();
  });

  it('displays placeholder text', async () => {
    const { getByPlaceholderText } = await render(
      <TextField placeholder="Enter email" value="" onChangeText={() => {}} />,
    );
    expect(getByPlaceholderText('Enter email')).toBeTruthy();
  });

  it('calls onChangeText when typing', async () => {
    const onChangeText = jest.fn();
    const { getByPlaceholderText } = await render(
      <TextField placeholder="Type here" value="" onChangeText={onChangeText} />,
    );
    fireEvent.changeText(getByPlaceholderText('Type here'), 'new value');
    expect(onChangeText).toHaveBeenCalledWith('new value');
  });

  it('displays error message when provided', async () => {
    const { getByText } = await render(
      <TextField value="" onChangeText={() => {}} error="This field is required" />,
    );
    expect(getByText('This field is required')).toBeTruthy();
  });

  it('does not display error when not provided', async () => {
    const { queryByText } = await render(
      <TextField value="" onChangeText={() => {}} />,
    );
    expect(queryByText('This field is required')).toBeNull();
  });
});
