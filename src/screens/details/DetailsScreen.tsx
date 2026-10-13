import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { spacing, typography } from '@theme';
import { useTranslation } from 'react-i18next';
import { Button, Screen } from '@components/ui';
import { useAppTheme } from '@hooks/useAppTheme';
import type { RootStackScreenProps } from '@navigation/types';
import { useNavigation, useRoute } from '@react-navigation/native';

type Props = RootStackScreenProps<'Details'>;

export const DetailsScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<Props['navigation']>();
  const route = useRoute<Props['route']>();
  const { colors: themeColors } = useAppTheme();

  return (
    <Screen centered>
      <Text style={[styles.text, { color: themeColors.textSecondary }]}>
        {t('details.id', { id: route.params.id })}
      </Text>
      {route.params.title && (
        <Text style={[styles.text, { color: themeColors.textSecondary }]}>
          {t('details.titleLabel', { title: route.params.title })}
        </Text>
      )}
      <Button
        title={t('details.goBack')}
        onPress={() => navigation.goBack()}
        style={styles.button}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: typography.fontSize.md,
    marginBottom: spacing.sm,
  },
  button: {
    marginTop: spacing.md,
    minWidth: 160,
  },
});
