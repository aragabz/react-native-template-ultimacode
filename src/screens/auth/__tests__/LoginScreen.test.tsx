import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { LoginScreen } from '../LoginScreen';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: mockNavigate }),
}));

describe('LoginScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders the login form', async () => {
    const { getByText, getByPlaceholderText } = await render(<LoginScreen />);

    expect(getByText('Welcome Back')).toBeTruthy();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
    expect(getByText('Log In')).toBeTruthy();
  });

  it('shows a link to navigate to Sign Up', async () => {
    const { getByText } = await render(<LoginScreen />);
    fireEvent.press(getByText("Don't have an account? Sign Up"));
    expect(mockNavigate).toHaveBeenCalledWith('SignUp');
  });

  it('shows a link to navigate to Forgot Password', async () => {
    const { getByText } = await render(<LoginScreen />);
    fireEvent.press(getByText('Forgot Password?'));
    expect(mockNavigate).toHaveBeenCalledWith('ForgotPassword');
  });
});
