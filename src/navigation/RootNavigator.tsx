import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TabNavigator } from './TabNavigator';

const Stack = createNativeStackNavigator();

/**
 * Root stack navigator for the application.
 * Manages top-level navigation, including main content and potential modals.
 * 
 * @return {React.JSX.Element} The rendered root stack.
 */
export const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Main" 
        component={TabNavigator} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
