import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { TextField } from '../TextField';

describe('Accessibility - Button', () => {
  it('has button role', async () => {
    const { getByRole } = await render(
      <Button title="Submit" onPress={() => {}} />,
    );
    expect(getByRole('button')).toBeTruthy();
  });

  it('has accessible label matching title', async () => {
    const { getByLabelText } = await render(
      <Button title="Save Changes" onPress={() => {}} />,
    );
    expect(getByLabelText('Save Changes')).toBeTruthy();
  });

  it('indicates disabled state to screen readers', async () => {
    const { getByRole } = await render(
      <Button title="Submit" onPress={() => {}} disabled />,
    );
    const button = getByRole('button');
    expect(button.props.accessibilityState?.disabled).toBe(true);
  });

  it('indicates loading state as busy', async () => {
    const { getByRole } = await render(
      <Button title="Submit" onPress={() => {}} loading />,
    );
    const button = getByRole('button');
    expect(button.props.accessibilityState?.busy).toBe(true);
  });
});

describe('Accessibility - TextField', () => {
  it('associates label with input', async () => {
    const { getByLabelText } = await render(
      <TextField label="Email" value="" onChangeText={() => {}} />,
    );
    expect(getByLabelText('Email')).toBeTruthy();
  });

  it('announces error to screen readers', async () => {
    const { getByLabelText, getByRole } = await render(
      <TextField
        label="Password"
        value=""
        onChangeText={() => {}}
        error="Password is required"
      />,
    );
    // React Native has no "invalid" state, so the error is exposed as the
    // input's hint and announced via a live alert region.
    expect(getByLabelText('Password').props.accessibilityHint).toBe(
      'Password is required',
    );
    expect(getByRole('alert')).toHaveTextContent('Password is required');
  });

  it('has hint text when provided as placeholder', async () => {
    const { getByHintText } = await render(
      <TextField
        label="Name"
        placeholder="Enter your name"
        value=""
        onChangeText={() => {}}
      />,
    );
    expect(getByHintText('Enter your name')).toBeTruthy();
  });
});

describe('Accessibility - Modal', () => {
  it('has modal role when visible', async () => {
    const { getByRole } = await render(
      <Modal visible={true} onClose={() => {}} title="Confirm">
        <Text>Are you sure?</Text>
      </Modal>,
    );
    // The RN Modal component should announce as a dialog
    expect(getByRole('dialog')).toBeTruthy();
  });

  it('close button has accessible label', async () => {
    const { getByLabelText } = await render(
      <Modal visible={true} onClose={() => {}} title="Settings">
        <Text>Content</Text>
      </Modal>,
    );
    expect(getByLabelText('Close')).toBeTruthy();
  });
});
