import React from 'react';
import { StyleSheet, Text } from 'react-native';
import {
  changeLanguage,
  getCurrentLanguage,
  type SupportedLanguage,
} from '@i18n';
import { spacing, typography } from '@theme';
import { useTranslation } from 'react-i18next';
import { Button, Card, OptionList, Screen } from '@components/ui';
import { APP_CONFIG } from '@constants/config';
import { useAppTheme } from '@hooks/useAppTheme';
import type { RootStackParamList } from '@navigation/types';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useThemeStore, type ThemeMode } from '@store/useThemeStore';

export const SettingsScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const mode = useThemeStore(s => s.mode);
  const setMode = useThemeStore(s => s.setMode);
  const { colors: themeColors } = useAppTheme();

  const sectionHeader = (label: string) => (
    <Text
      accessibilityRole="header"
      style={[styles.sectionHeader, { color: themeColors.textSecondary }]}
    >
      {label}
    </Text>
  );

  return (
    <Screen>
      {sectionHeader(t('settings.theme'))}
      <Card style={styles.listCard}>
        <OptionList<ThemeMode>
          accessibilityLabel={t('settings.theme')}
          selected={mode}
          onSelect={setMode}
          options={[
            { value: 'system', label: t('settings.system') },
            { value: 'light', label: t('settings.light') },
            { value: 'dark', label: t('settings.dark') },
          ]}
        />
      </Card>

      {sectionHeader(t('settings.appLanguage'))}
      <Card style={styles.listCard}>
        <OptionList<SupportedLanguage>
          accessibilityLabel={t('settings.appLanguage')}
          selected={getCurrentLanguage()}
          onSelect={changeLanguage}
          options={[
            { value: 'en', label: t('settings.english') },
            { value: 'ar', label: t('settings.arabic') },
          ]}
        />
      </Card>

      {sectionHeader(t('settings.preferences'))}
      <Card>
        <Button
          title={t('settings.goToDetails')}
          variant="secondary"
          onPress={() =>
            navigation.navigate('Details', {
              id: '99',
              title: t('settings.fromSettings'),
            })
          }
        />
      </Card>

      {sectionHeader(t('settings.appInfo'))}
      <Card>
        <Text style={[styles.infoText, { color: themeColors.text }]}>
          {t('settings.version', { version: APP_CONFIG.VERSION })}
        </Text>
        <Text style={[styles.infoText, { color: themeColors.textSecondary }]}>
          {t('settings.environment', { env: APP_CONFIG.ENV })}
        </Text>
      </Card>
    </Screen>
  );
};

const styles = StyleSheet.create({
  listCard: {
    paddingVertical: spacing.xs,
  },
  sectionHeader: {
    textAlign: 'left',
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    marginHorizontal: spacing.md,
  },
  infoText: {
    textAlign: 'left',
    fontSize: typography.fontSize.md,
    marginVertical: spacing.xs,
  },
});
