import React from 'react';
import {
  ExamplesScreen,
  HomeScreen,
  SettingsScreen,
  ShowcaseScreen,
} from '@screens';
import { useTranslation } from 'react-i18next';
import { Icon } from '@components/ui';
import { useAppTheme } from '@hooks/useAppTheme';
import type { TabParamList } from '@navigation/types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator<TabParamList>();

const TAB_ICONS: Record<
  keyof TabParamList,
  { family: React.ComponentProps<typeof Icon>['family']; name: string }
> = {
  Home: { family: 'MaterialIcons', name: 'home' },
  Examples: { family: 'MaterialIcons', name: 'widgets' },
  Settings: { family: 'MaterialIcons', name: 'settings' },
  Showcase: { family: 'MaterialIcons', name: 'palette' },
};

export const TabNavigator = () => {
  const { t } = useTranslation();
  const { colors: themeColors } = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        title: t(`navigation.${route.name.toLowerCase()}`),
        tabBarIcon: ({ color, size }) => {
          const config = TAB_ICONS[route.name];
          return (
            <Icon
              family={config.family}
              name={config.name}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: themeColors.primary,
        tabBarInactiveTintColor: themeColors.textSecondary,
        tabBarStyle: {
          backgroundColor: themeColors.surface,
          borderTopColor: themeColors.border,
        },
        headerStyle: { backgroundColor: themeColors.surface },
        headerTintColor: themeColors.text,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Examples" component={ExamplesScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      {__DEV__ && <Tab.Screen name="Showcase" component={ShowcaseScreen} />}
    </Tab.Navigator>
  );
};
