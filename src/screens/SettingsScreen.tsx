import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { changeLanguage, getCurrentLanguage, type SupportedLanguage } from '@i18n';
import { spacing, typography } from '@theme';
import { useTranslation } from 'react-i18next';
import { Button, Card, LegendList } from '@components/ui';
import { useAppTheme } from '@hooks/useAppTheme';
import type { RootStackParamList } from '@navigation/types';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useThemeStore } from '@store/useThemeStore';
import { APP_CONFIG } from '@constants/config';

export const SettingsScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const currentLang = getCurrentLanguage();
  const mode = useThemeStore((s) => s.mode);
  const setMode = useThemeStore((s) => s.setMode);
  const { colors: themeColors } = useAppTheme();

  const toggleLanguage = () => {
    const nextLang: SupportedLanguage = currentLang === 'en' ? 'ar' : 'en';
    changeLanguage(nextLang);
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('settings.preferences')}</Text>
        <Button
          title={t('settings.goToDetails')}
          onPress={() => navigation.navigate('Details', { id: '99', title: 'From Settings' })}
        />
        <View style={[styles.languageSection, { borderTopColor: themeColors.border }]}>
          <Text accessibilityRole="header" style={[styles.languageLabel, { color: themeColors.textSecondary }]}>
            {t('settings.appLanguage')}
          </Text>
          <Button
            title={currentLang === 'en' ? t('settings.arabic') : t('settings.english')}
            variant="outline"
            onPress={toggleLanguage}
          />
        </View>
      </Card>

      <Card style={[styles.card, styles.sectionSpacing]}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('settings.theme')}</Text>
        <Text style={[styles.languageLabel, { color: themeColors.textSecondary }]}>
          {t('settings.currentTheme', { mode })}
        </Text>
        <LegendList
          items={[
            { label: t('settings.system'), color: themeColors.primary, onPress: () => setMode('system') },
            { label: t('settings.light'), color: themeColors.success, onPress: () => setMode('light') },
            { label: t('settings.dark'), color: themeColors.error, onPress: () => setMode('dark') },
          ]}
        />
      </Card>

      <Card style={[styles.card, styles.sectionSpacing]}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('settings.appInfo')}</Text>
        <Text style={[styles.infoText, { color: themeColors.textSecondary }]}>
          {t('settings.version', { version: APP_CONFIG.VERSION })}
        </Text>
        <Text style={[styles.infoText, { color: themeColors.textSecondary }]}>
          {t('settings.environment', { env: APP_CONFIG.API_BASE_URL })}
        </Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  card: { width: '100%' },
  sectionSpacing: {
    marginTop: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.sm,
  },
  languageSection: {
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
  },
  languageLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  infoText: {
    fontSize: typography.fontSize.md,
    marginBottom: spacing.xs,
  },
});
