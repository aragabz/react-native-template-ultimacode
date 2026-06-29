import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigator } from '../RootNavigator';

import { useAuthStore } from '@store/useAuthStore';

// Mock the native modules
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

describe('TabNavigator', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, token: 'mock-token', isHydrating: false });
  });

  it('renders Home and Settings tabs', async () => {
    await render(
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    );

    // Initial screen should be Home (via TabNavigator)
    expect(await screen.findByText('Home Screen')).toBeTruthy();
    
    // Check if Settings tab is available
    const settingsTab = screen.getByText('Settings');
    expect(settingsTab).toBeTruthy();
    
    // Switch to Settings tab
    fireEvent.press(settingsTab);
    
    // Should show Settings Screen content
    expect(await screen.findByText('Go to Details')).toBeTruthy();
  });
});
