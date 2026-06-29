import React from 'react';
import { useTranslation } from 'react-i18next';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen } from '@screens/HomeScreen';
import { DemoScreen } from '@screens/DemoScreen';
import { SettingsScreen } from '@screens/SettingsScreen';
import { ShowcaseScreen } from '@screens/ShowcaseScreen';
import { Icon } from '@components/ui';
import { useAppTheme } from '@hooks/useAppTheme';
import type { TabParamList } from '@navigation/types';

const Tab = createBottomTabNavigator<TabParamList>();

const TAB_ICONS: Record<keyof TabParamList, { family: React.ComponentProps<typeof Icon>['family']; name: string }> = {
  Home: { family: 'MaterialIcons', name: 'home' },
  Demo: { family: 'MaterialIcons', name: 'play-circle' },
  Showcase: { family: 'MaterialIcons', name: 'palette' },
  Settings: { family: 'MaterialIcons', name: 'settings' },
};

export const TabNavigator = () => {
  const { t } = useTranslation();
  const { colors: themeColors, isDark } = useAppTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: t(`navigation.${route.name.toLowerCase()}`),
        tabBarIcon: ({ focused, color, size }) => {
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
        tabBarStyle: { backgroundColor: themeColors.background, borderTopColor: themeColors.border },
        headerStyle: { backgroundColor: themeColors.background },
        headerTintColor: themeColors.text,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Demo" component={DemoScreen} />
      {__DEV__ && <Tab.Screen name="Showcase" component={ShowcaseScreen} />}
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
