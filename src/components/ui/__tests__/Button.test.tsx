import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '../Button';

describe('Button', () => {
  it('renders the title text', async () => {
    const utils = await render(<Button title="Submit" onPress={() => {}} />);
    expect(utils.getByText('Submit')).toBeTruthy();
  });

  it('calls onPress when pressed', async () => {
    const onPress = jest.fn();
    const { getByText } = await render(<Button title="Press me" onPress={onPress} />);
    fireEvent.press(getByText('Press me'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', async () => {
    const onPress = jest.fn();
    const { getByText } = await render(
      <Button title="Disabled" onPress={onPress} disabled />,
    );
    fireEvent.press(getByText('Disabled'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('does not call onPress when loading', async () => {
    const onPress = jest.fn();
    const { getByTestId } = await render(
      <Button title="Loading" onPress={onPress} loading testID="loading-btn" />,
    );
    fireEvent.press(getByTestId('loading-btn'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('renders secondary variant', async () => {
    const { getByText } = await render(
      <Button title="Secondary" onPress={() => {}} variant="secondary" />,
    );
    expect(getByText('Secondary')).toBeTruthy();
  });

  it('renders outline variant', async () => {
    const utils = await render(
      <Button title="Outline" onPress={() => {}} variant="outline" />,
    );
    expect(utils.getByText('Outline')).toBeTruthy();
  });
});
