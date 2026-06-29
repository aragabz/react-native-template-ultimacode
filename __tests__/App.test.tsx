/**
 * @format
 */

import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import App from '../App';

jest.mock('react-native-screens', () => {
  const React = require('react');
  return {
    enableScreens: jest.fn(),
    Screen: ({ children }: { children: React.ReactNode }) => children,
    ScreenContainer: ({ children }: { children: React.ReactNode }) => children,
    NativeScreen: ({ children }: { children: React.ReactNode }) => children,
    NativeScreenContainer: ({ children }: { children: React.ReactNode }) => children,
    ScreenStack: ({ children }: { children: React.ReactNode }) => children,
    ScreenStackItem: ({ children }: { children: React.ReactNode }) => children,
    FullWindowOverlay: ({ children }: { children: React.ReactNode }) => children,
    ScreenStackHeaderConfig: ({ children }: { children: React.ReactNode }) => children,
    ScreenStackHeaderSubview: ({ children }: { children: React.ReactNode }) => children,
    SearchBar: ({ children }: { children: React.ReactNode }) => children,
    shouldUseActivityState: true,
    compatibilityFlags: {
      usesNewAndroidHeaderHeightImplementation: false,
    },
  };
});

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('expo-status-bar', () => {
  const React = require('react');
  return {
    StatusBar: (props: any) => React.createElement('View', props),
  };
});

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.NativeModules.KeyboardObserver = {
    addListener: jest.fn(() => ({ remove: jest.fn() })),
    removeListeners: jest.fn(),
  };
  RN.Keyboard.addListener = jest.fn(() => ({ remove: jest.fn() }));
  return RN;
});

test('renders correctly', async () => {
  const { toJSON } = await render(<App />);
  await waitFor(() => {
    expect(toJSON()).not.toBeNull();
  });
});
