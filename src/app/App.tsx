import React, { useEffect, useState, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { createQueryClient } from '@services/queryClient';
import { useAuthStore, selectIsHydrating } from '@store/useAuthStore';
import { RootNavigator } from '@navigation/RootNavigator';
import { linking } from '@navigation/linking';
import { Toast, ErrorBoundary } from '@components/ui';
import { useAppTheme } from '@hooks/useAppTheme';
import initI18n, { onRtlChange } from '@i18n';

SplashScreen.preventAutoHideAsync();

const queryClient = createQueryClient();

function App() {
  const isHydrating = useAuthStore(selectIsHydrating);
  const [fontsLoaded] = useFonts({});
  const [i18nReady, setI18nReady] = useState(false);
  const [rtlKey, setRtlKey] = useState(0);
  const { colors: themeColors, isDark } = useAppTheme();

  const navigationTheme = isDark
    ? { ...DarkTheme, colors: { ...DarkTheme.colors, primary: themeColors.primary, background: themeColors.background, card: themeColors.surface, text: themeColors.text, border: themeColors.border } }
    : { ...DefaultTheme, colors: { ...DefaultTheme.colors, primary: themeColors.primary, background: themeColors.background, card: themeColors.surface, text: themeColors.text, border: themeColors.border } };

  useEffect(() => {
    initI18n().then(() => {
      setI18nReady(true);
    });
  }, []);

  useEffect(() => {
    return onRtlChange(() => {
      setRtlKey((k) => k + 1);
    });
  }, []);

  const onReady = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    if (fontsLoaded && !isHydrating && i18nReady) {
      onReady();
    }
  }, [fontsLoaded, isHydrating, i18nReady, onReady]);

  if (!fontsLoaded || isHydrating || !i18nReady) {
    return null;
  }

  return (
    <ErrorBoundary>
      <GestureHandlerRootView key={rtlKey} style={{ flex: 1 }}>
        <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer linking={linking} theme={navigationTheme}>
              <StatusBar style={isDark ? 'light' : 'dark'} />
              <RootNavigator />
              <Toast />
            </NavigationContainer>
          </QueryClientProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}

export default App;
