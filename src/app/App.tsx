import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import initI18n, { onRtlChange } from '@i18n';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toast, ErrorBoundary, LoadingSpinner, OfflineBanner } from '@components/ui';
import { useAppTheme } from '@hooks/useAppTheme';
import { linking } from '@navigation/linking';
import { RootNavigator } from '@navigation/RootNavigator';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createQueryClient } from '@services/queryClient';
import { useAuthStore, selectIsHydrating } from '@store/useAuthStore';
import { QueryClientProvider } from '@tanstack/react-query';

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
    return (
      <View style={{ flex: 1, backgroundColor: themeColors.background }}>
        <LoadingSpinner />
      </View>
    );
  }

  return (
    <ErrorBoundary>
      <GestureHandlerRootView key={rtlKey} style={{ flex: 1, backgroundColor: themeColors.background }}>
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
