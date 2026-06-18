import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '@screens/HomeScreen';
import { DemoScreen } from '@screens/DemoScreen';
import { SettingsScreen } from '@screens/SettingsScreen';
import { ShowcaseScreen } from '@screens/ShowcaseScreen';
import type { TabParamList } from '@navigation/types';

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Demo" component={DemoScreen} />
      {__DEV__ && <Tab.Screen name="Showcase" component={ShowcaseScreen} />}
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
