import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@theme';

type LoadingSpinnerProps = {
  size?: 'small' | 'large';
  message?: string;
  color?: string;
};

export const LoadingSpinner = ({
  size = 'large',
  message,
  color,
}: LoadingSpinnerProps) => {
  const themeColors = colors.light;

  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color ?? themeColors.primary} />
      {message && <Text style={[styles.message, { color: themeColors.textSecondary }]}>{message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  message: {
    fontSize: typography.fontSize.sm,
    marginTop: spacing.md,
    textAlign: 'center',
  },
});
