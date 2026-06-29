import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthStore } from '@store/useAuthStore';
import { render, screen } from '@testing-library/react-native';
import { RootNavigator } from '../RootNavigator';

// Mock the native modules needed by React Navigation
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

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  RN.NativeModules.KeyboardObserver = {
    addListener: jest.fn(() => ({ remove: jest.fn() })),
    removeListeners: jest.fn(),
  };
  RN.Keyboard.addListener = jest.fn(() => ({ remove: jest.fn() }));
  return RN;
});

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const insets = { top: 0, right: 0, bottom: 0, left: 0 };
  const frame = { x: 0, y: 0, width: 390, height: 844 };
  return {
    SafeAreaProvider: ({ children }: { children: React.ReactNode }) => children,
    SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
    useSafeAreaInsets: () => insets,
    useSafeAreaFrame: () => frame,
    SafeAreaInsetsContext: React.createContext(insets),
    SafeAreaFrameContext: React.createContext(frame),
  };
});

describe('RootNavigator', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, token: 'mock-token', isHydrating: false });
  });

  it('renders the initial screen (Home)', async () => {
    await render(
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    );

    expect(await screen.findByText('Home Screen')).toBeTruthy();
  });
});
