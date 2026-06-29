import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing, typography } from '@theme';
import { useAppTheme } from '@hooks/useAppTheme';

export const ForgotPasswordScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const { colors: themeColors } = useAppTheme();

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: themeColors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: themeColors.text }]}>{t('auth.forgotPassword.title')}</Text>
        {sent ? (
          <>
            <Text style={[styles.text, { color: themeColors.textSecondary }]}>
              {t('auth.forgotPassword.sentMessage', { email })}
            </Text>
            <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.primary }]} onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>{t('auth.forgotPassword.backToLogin')}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              style={[styles.input, { borderColor: themeColors.border, color: themeColors.text }]}
              placeholder={t('auth.forgotPassword.email')}
              placeholderTextColor={themeColors.textSecondary}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.primary }]} onPress={() => setSent(true)}>
              <Text style={styles.buttonText}>{t('auth.forgotPassword.sendResetLink')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={[styles.link, { color: themeColors.primary }]}>{t('auth.forgotPassword.backToLogin')}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: spacing.lg },
  title: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  text: {
    fontSize: typography.fontSize.md,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    fontSize: typography.fontSize.md,
    marginBottom: spacing.md,
  },
  button: {
    paddingVertical: spacing.sm + 4,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  buttonText: {
    color: '#fff',
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
  link: {
    fontSize: typography.fontSize.sm,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
