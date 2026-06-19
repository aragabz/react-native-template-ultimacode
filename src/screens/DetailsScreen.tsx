import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RootStackScreenProps } from '@navigation/types';
import { colors, spacing, typography } from '@theme';

type Props = RootStackScreenProps<'Details'>;

export const DetailsScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('details.title')}</Text>
      <Text style={styles.text}>{t('details.id', { id: route.params.id })}</Text>
      {route.params.title && <Text style={styles.text}>{t('details.titleLabel', { title: route.params.title })}</Text>}
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>{t('details.goBack')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.light.background,
  },
  title: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    color: colors.light.text,
    marginBottom: spacing.lg,
  },
  text: {
    fontSize: typography.fontSize.md,
    color: colors.light.textSecondary,
    marginBottom: spacing.sm,
  },
  button: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm + 4,
    backgroundColor: colors.light.primary,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
});
