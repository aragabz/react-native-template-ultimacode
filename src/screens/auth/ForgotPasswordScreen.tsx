import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, spacing, typography } from '@theme';

export const ForgotPasswordScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        <Text style={styles.title}>{t('auth.forgotPassword.title')}</Text>
        {sent ? (
          <>
            <Text style={styles.text}>
              {t('auth.forgotPassword.sentMessage', { email })}
            </Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
              <Text style={styles.buttonText}>{t('auth.forgotPassword.backToLogin')}</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder={t('auth.forgotPassword.email')}
              placeholderTextColor={colors.light.textSecondary}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <TouchableOpacity style={styles.button} onPress={() => setSent(true)}>
              <Text style={styles.buttonText}>{t('auth.forgotPassword.sendResetLink')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={styles.link}>{t('auth.forgotPassword.backToLogin')}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.light.background },
  content: { flex: 1, justifyContent: 'center', paddingHorizontal: spacing.lg },
  title: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.light.text,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  text: {
    fontSize: typography.fontSize.md,
    color: colors.light.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.light.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    fontSize: typography.fontSize.md,
    color: colors.light.text,
    marginBottom: spacing.md,
  },
  button: {
    backgroundColor: colors.light.primary,
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
    color: colors.light.primary,
    fontSize: typography.fontSize.sm,
    textAlign: 'center',
    marginTop: spacing.md,
  },
});
