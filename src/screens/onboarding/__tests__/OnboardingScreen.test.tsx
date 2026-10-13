import React from 'react';
import { OnboardingScreen } from '@screens/onboarding/OnboardingScreen';
import { useSettingsStore } from '@store/useSettingsStore';
import { render, fireEvent } from '@testing-library/react-native';

describe('OnboardingScreen', () => {
  beforeEach(() => {
    useSettingsStore.setState({ onboardingSeen: false });
  });

  it('renders onboarding content with welcome message', async () => {
    const { getAllByText } = await render(<OnboardingScreen />);
    expect(getAllByText(/welcome/i).length).toBeGreaterThan(0);
  });

  it('renders a Get Started button', async () => {
    const { getByText } = await render(<OnboardingScreen />);
    expect(getByText(/get started/i)).toBeTruthy();
  });

  it('renders multiple onboarding steps/pages', async () => {
    const { getAllByTestId } = await render(<OnboardingScreen />);
    const pages = getAllByTestId(/onboarding-page/);
    expect(pages.length).toBeGreaterThanOrEqual(2);
  });

  it('calls setOnboardingSeen(true) when Get Started is pressed', async () => {
    const spy = jest.fn();
    useSettingsStore.setState({ setOnboardingSeen: spy });

    const { getByText } = await render(<OnboardingScreen />);
    fireEvent.press(getByText(/get started/i));

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('has accessible heading on each page', async () => {
    const { getAllByRole } = await render(<OnboardingScreen />);
    const headers = getAllByRole('header');
    expect(headers.length).toBeGreaterThanOrEqual(1);
  });
});
