import React, { useEffect, useState, useCallback } from 'react';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore, selectIsHydrating } from '@store/useAuthStore';
import { RootNavigator } from '@navigation/RootNavigator';
import { linking } from '@navigation/linking';
import { Toast } from '@components/ui';
import initI18n, { onRtlChange } from '@i18n';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const isHydrating = useAuthStore(selectIsHydrating);
  const [fontsLoaded] = useFonts({});
  const [i18nReady, setI18nReady] = useState(false);
  const [rtlKey, setRtlKey] = useState(0);

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
    <GestureHandlerRootView key={rtlKey} style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer linking={linking}>
            <StatusBar style={isDarkMode ? 'light' : 'dark'} />
            <RootNavigator />
            <Toast />
          </NavigationContainer>
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default App;
