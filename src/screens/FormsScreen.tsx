import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, Card, TextField, useToastStore } from '@components/ui';
import { useAppTheme } from '@hooks/useAppTheme';
import { isValidEmail, isNonEmpty } from '@utils/validators';
import { spacing, typography } from '@theme';

type FormState = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const initialFormState: FormState = {
  name: '',
  email: '',
  message: '',
};

export const FormsScreen = () => {
  const { t } = useTranslation();
  const { colors: themeColors } = useAppTheme();
  const showToast = useToastStore((s) => s.show);
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [lastSubmitted, setLastSubmitted] = useState<FormState | null>(null);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!isNonEmpty(form.name)) {
      nextErrors.name = t('forms.errors.name');
    }

    if (!isValidEmail(form.email)) {
      nextErrors.email = t('forms.errors.email');
    }

    if (form.message.trim().length < 10) {
      nextErrors.message = t('forms.errors.message');
    }

    return nextErrors;
  };

  const handleSubmit = () => {
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      showToast(t('forms.validationFailed'), 'error');
      return;
    }

    setLastSubmitted(form);
    showToast(t('forms.successToast'), 'success');
    setForm(initialFormState);
  };

  const handleReset = () => {
    setForm(initialFormState);
    setErrors({});
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]} contentContainerStyle={styles.content}>
      <Text style={[styles.title, { color: themeColors.text }]}>{t('forms.title')}</Text>

      <Card style={[styles.card, { backgroundColor: themeColors.surface }]}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('forms.sectionTitle')}</Text>
        <TextField
          label={t('forms.nameLabel')}
          placeholder={t('forms.namePlaceholder')}
          value={form.name}
          onChangeText={(value) => updateField('name', value)}
          error={errors.name}
        />
        <TextField
          label={t('forms.emailLabel')}
          placeholder={t('forms.emailPlaceholder')}
          value={form.email}
          onChangeText={(value) => updateField('email', value)}
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextField
          label={t('forms.messageLabel')}
          placeholder={t('forms.messagePlaceholder')}
          value={form.message}
          onChangeText={(value) => updateField('message', value)}
          error={errors.message}
          multiline
        />

        <View style={styles.actions}>
          <Button title={t('forms.submit')} onPress={handleSubmit} />
          <Button title={t('forms.reset')} variant="outline" onPress={handleReset} />
        </View>
      </Card>

      {lastSubmitted && (
        <Card style={[styles.card, { backgroundColor: themeColors.surface }]}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('forms.lastSubmitted')}</Text>
          <Text style={[styles.summaryText, { color: themeColors.textSecondary }]}>{t('forms.summaryName', { name: lastSubmitted.name })}</Text>
          <Text style={[styles.summaryText, { color: themeColors.textSecondary }]}>{t('forms.summaryEmail', { email: lastSubmitted.email })}</Text>
          <Text style={[styles.summaryText, { color: themeColors.textSecondary }]}>{t('forms.summaryMessage', { message: lastSubmitted.message })}</Text>
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md,
  },
  card: {
    marginTop: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.md,
  },
  actions: {
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  summaryText: {
    fontSize: typography.fontSize.md,
    marginBottom: spacing.xs,
  },
});
