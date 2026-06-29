import React from 'react';
import { AuthNavigator } from '@navigation/AuthNavigator';
import { TabNavigator } from '@navigation/TabNavigator';
import type { RootStackParamList } from '@navigation/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DetailsScreen } from '@screens/DetailsScreen';
import { useAuthStore, selectIsAuthenticated } from '@store/useAuthStore';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
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
