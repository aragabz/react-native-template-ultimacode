import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { changeLanguage, getCurrentLanguage, type SupportedLanguage } from '@i18n';
import { spacing, typography } from '@theme';
import { useTranslation } from 'react-i18next';
import { Button, Card } from '@components/ui';
import { useAppTheme } from '@hooks/useAppTheme';
import type { RootStackParamList } from '@navigation/types';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuthStore, selectIsAuthenticated } from '@store/useAuthStore';

export const SettingsScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const logout = useAuthStore((s) => s.logout);
  const currentLang = getCurrentLanguage();
  const { colors: themeColors } = useAppTheme();

  const toggleLanguage = () => {
    const nextLang: SupportedLanguage = currentLang === 'en' ? 'ar' : 'en';
    changeLanguage(nextLang);
  };

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Card style={styles.card}>
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
        {isAuthenticated && (
          <Button
            title={t('settings.logOut')}
            variant="outline"
            onPress={logout}
            style={{ marginTop: spacing.md }}
          />
        )}
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
});
