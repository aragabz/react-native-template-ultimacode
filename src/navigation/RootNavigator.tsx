import React from 'react';
import {
  DetailsScreen,
  FormsScreen,
  ListScreen,
  OfflineScreen,
  OnboardingScreen,
} from '@screens';
import { useTranslation } from 'react-i18next';
import { TabNavigator } from '@navigation/TabNavigator';
import type { RootStackParamList } from '@navigation/types';
import {
  createNativeStackNavigator,
  type NativeStackNavigationOptions,
} from '@react-navigation/native-stack';
import {
  useSettingsStore,
  selectOnboardingSeen,
} from '@store/useSettingsStore';

const Stack = createNativeStackNavigator<RootStackParamList>();

/** Options for screens pushed on top of the tabs. */
const pushed = (title: string): NativeStackNavigationOptions => ({
  headerShown: true,
  title,
  headerBackButtonDisplayMode: 'minimal',
});

export const RootNavigator = () => {
  const { t } = useTranslation();
  const onboardingSeen = useSettingsStore(selectOnboardingSeen);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!onboardingSeen ? (
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      ) : (
        <>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen
            name="Details"
            component={DetailsScreen}
            options={pushed(t('navigation.details'))}
          />
          <Stack.Screen
            name="List"
            component={ListScreen}
            options={pushed(t('demo.listDetailExample'))}
          />
          <Stack.Screen
            name="Forms"
            component={FormsScreen}
            options={pushed(t('demo.formsExample'))}
          />
          <Stack.Screen
            name="Offline"
            component={OfflineScreen}
            options={pushed(t('demo.offlineExample'))}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
