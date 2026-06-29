import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { spacing, typography } from '@theme';
import { useTranslation } from 'react-i18next';
import { useAppTheme } from '@hooks/useAppTheme';
import type { RootStackScreenProps } from '@navigation/types';
import { useNavigation, useRoute } from '@react-navigation/native';

type Props = RootStackScreenProps<'Details'>;

export const DetailsScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const { colors: themeColors } = useAppTheme();

  useEffect(() => {

  }, [route.params.id]);

  return (
    <View
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <Text style={[styles.title, { color: themeColors.text }]}>
        {t('details.title')}
      </Text>
      <Text style={[styles.text, { color: themeColors.textSecondary }]}>
        {t('details.id', { id: route.params.id })}
      </Text>
      {route.params.title && (
        <Text style={[styles.text, { color: themeColors.textSecondary }]}>
          {t('details.titleLabel', { title: route.params.title })}
        </Text>
      )}
      <TouchableOpacity
        style={[styles.button, { backgroundColor: themeColors.primary }]}
        onPress={() => navigation.goBack()}
      >
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
  },
  title: {
    fontSize: typography.fontSize.title,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.lg,
  },
  text: {
    fontSize: typography.fontSize.md,
    marginBottom: spacing.sm,
  },
  button: {
    marginTop: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm + 4,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
});
