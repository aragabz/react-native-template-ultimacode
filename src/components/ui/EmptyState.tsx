import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing, typography } from '@theme';
import { useAppTheme } from '@hooks/useAppTheme';

type EmptyStateProps = {
  title: string;
  message?: string;
  action?: React.ReactNode;
};

export const EmptyState = ({ title, message, action }: EmptyStateProps) => {
  const { colors: themeColors } = useAppTheme();

  return (
    <View style={styles.container} accessible={true} accessibilityRole="summary">
      <Text accessibilityRole="header" style={[styles.title, { color: themeColors.text }]}>{title}</Text>
      {message && <Text style={[styles.message, { color: themeColors.textSecondary }]}>{message}</Text>}
      {action && <View style={styles.action}>{action}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  message: {
    fontSize: typography.fontSize.sm,
    textAlign: 'center',
    lineHeight: 20,
  },
  action: { marginTop: spacing.lg },
});
