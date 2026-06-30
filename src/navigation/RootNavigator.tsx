import React from 'react';
import { AuthNavigator } from '@navigation/AuthNavigator';
import { TabNavigator } from '@navigation/TabNavigator';
import type { RootStackParamList } from '@navigation/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DetailsScreen } from '@screens/DetailsScreen';
import { OnboardingScreen } from '@screens/OnboardingScreen';
import { useAuthStore, selectIsAuthenticated } from '@store/useAuthStore';
import { useSettingsStore, selectOnboardingSeen } from '@store/useSettingsStore';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const onboardingSeen = useSettingsStore(selectOnboardingSeen);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!onboardingSeen ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : isAuthenticated ? (
        <>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="Details" component={DetailsScreen} options={{ headerShown: true }} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};
