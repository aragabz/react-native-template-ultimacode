import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import initI18n from '@i18n';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Toast,
  ErrorBoundary,
  LoadingSpinner,
  OfflineBanner,
} from '@components/ui';
import { APP_CONFIG } from '@constants/config';
import { useAppTheme } from '@hooks/useAppTheme';
import { linking } from '@navigation/linking';
import { RootNavigator } from '@navigation/RootNavigator';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { initAnalytics } from '@services/analytics';
import { initCrashReporting } from '@services/crashReporting';
import { bindOnlineManager, createQueryClient } from '@services/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';

SplashScreen.preventAutoHideAsync();

initCrashReporting({
  dsn: APP_CONFIG.SENTRY_DSN,
  enabled: APP_CONFIG.SENTRY_DSN !== '',
  environment: APP_CONFIG.ENV,
});
initAnalytics({ enabled: APP_CONFIG.ENABLE_ANALYTICS });
bindOnlineManager();

const queryClient = createQueryClient();

function App() {
  const [fontsLoaded] = useFonts({});
  const [i18nReady, setI18nReady] = useState(false);
  const [ready, setReady] = useState(false);
  const { colors: themeColors, isDark } = useAppTheme();

  const navigationTheme = isDark
    ? {
        ...DarkTheme,
        colors: {
          ...DarkTheme.colors,
          primary: themeColors.primary,
          background: themeColors.background,
          card: themeColors.surface,
          text: themeColors.text,
          border: themeColors.border,
        },
      }
    : {
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          primary: themeColors.primary,
          background: themeColors.background,
          card: themeColors.surface,
          text: themeColors.text,
          border: themeColors.border,
        },
      };

  useEffect(() => {
    initI18n()
      .then(() => {
        setI18nReady(true);
      })
      .catch(() => {
        setI18nReady(true);
      });
  }, []);

  const onReady = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  useEffect(() => {
    if (fontsLoaded && i18nReady) {
      setReady(true);
      onReady();
    }
  }, [fontsLoaded, i18nReady, onReady]);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, backgroundColor: themeColors.background }}>
        <LoadingSpinner />
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <GestureHandlerRootView
        style={{ flex: 1, backgroundColor: themeColors.background }}
      >
        <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>
            <NavigationContainer linking={linking} theme={navigationTheme}>
              <StatusBar style={isDark ? 'light' : 'dark'} />
              <RootNavigator />
              <Toast />
              <OfflineBanner />
            </NavigationContainer>
          </QueryClientProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}

export default App;
