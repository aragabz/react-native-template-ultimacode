import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthStore } from '@store/useAuthStore';
import type { User } from '@store/useAuthStore';
import type { AuthStackParamList } from '@navigation/types';
import { spacing, typography } from '@theme';
import { useAppTheme } from '@hooks/useAppTheme';

export const SignUpScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const login = useAuthStore((state) => state.login);
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { colors: themeColors } = useAppTheme();

  const handleSignUp = () => {
    const mockUser: User = { id: '2', email, name };
    login(mockUser, 'mock-token-456');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: themeColors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: themeColors.text }]}>{t('auth.signUp.title')}</Text>
        <TextInput
          style={[styles.input, { borderColor: themeColors.border, color: themeColors.text }]}
          placeholder={t('auth.signUp.name')}
          placeholderTextColor={themeColors.textSecondary}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, { borderColor: themeColors.border, color: themeColors.text }]}
          placeholder={t('auth.signUp.email')}
          placeholderTextColor={themeColors.textSecondary}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={[styles.input, { borderColor: themeColors.border, color: themeColors.text }]}
          placeholder={t('auth.signUp.password')}
          placeholderTextColor={themeColors.textSecondary}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.primary }]} onPress={handleSignUp}>
          <Text style={styles.buttonText}>{t('auth.signUp.signUp')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.link, { color: themeColors.primary }]}>{t('auth.signUp.loginLink')}</Text>
        </TouchableOpacity>
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
