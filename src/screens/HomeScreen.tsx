import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing, typography } from '@theme';
import { useTranslation } from 'react-i18next';
import { LegendList } from '@components/ui';
import { useAppTheme } from '@hooks/useAppTheme';
import type { RootStackParamList } from '@navigation/types';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const HomeScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors: themeColors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text accessibilityRole="header" style={[styles.header, { color: themeColors.text }]}>
        {t('home.title')}
      </Text>
      <LegendList
        title="Status Legend"
        items={[
          {
            label: 'Active',
            color: themeColors.success,
            onPress: () => navigation.navigate('Details', { id: '1', title: 'Active' }),
          },
          {
            label: 'Pending',
            color: themeColors.primary,
            onPress: () => navigation.navigate('Details', { id: '2', title: 'Pending' }),
          },
          {
            label: 'Error',
            color: themeColors.error,
            onPress: () => navigation.navigate('Details', { id: '3', title: 'Error' }),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  header: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.lg,
    marginTop: spacing.md,
  },
});
