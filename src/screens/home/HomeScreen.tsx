import React from 'react';
import { StyleSheet } from 'react-native';
import { spacing } from '@theme';
import { useTranslation } from 'react-i18next';
import { Card, LegendList, Screen } from '@components/ui';
import { useAppTheme } from '@hooks/useAppTheme';
import type { RootStackParamList } from '@navigation/types';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const HomeScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors: themeColors } = useAppTheme();

  return (
    <Screen>
      <Card style={styles.card}>
        <LegendList
          title={t('home.statusLegend')}
          items={[
            {
              label: t('home.active'),
              color: themeColors.success,
              onPress: () =>
                navigation.navigate('Details', {
                  id: '1',
                  title: t('home.active'),
                }),
            },
            {
              label: t('home.pending'),
              color: themeColors.primary,
              onPress: () =>
                navigation.navigate('Details', {
                  id: '2',
                  title: t('home.pending'),
                }),
            },
            {
              label: t('home.error'),
              color: themeColors.error,
              onPress: () =>
                navigation.navigate('Details', {
                  id: '3',
                  title: t('home.error'),
                }),
            },
          ]}
        />
      </Card>
    </Screen>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: spacing.sm,
  },
});
