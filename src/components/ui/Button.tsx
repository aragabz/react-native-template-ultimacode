import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { spacing, typography } from '@theme';
import { useAppTheme } from '@hooks/useAppTheme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  style?: object;
  testID?: string;
};

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  testID,
}: ButtonProps) => {
  const { colors: themeColors } = useAppTheme();

  const variantStyle = {
    primary: {
      container: { backgroundColor: themeColors.primary },
      text: { color: '#fff' },
    },
    secondary: {
      container: { backgroundColor: themeColors.surface },
      text: { color: themeColors.text },
    },
    outline: {
      container: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: themeColors.primary,
      },
      text: { color: themeColors.primary },
    },
    ghost: {
      container: { backgroundColor: 'transparent' },
      text: { color: themeColors.primary },
    },
  }[variant];

  return (
    <TouchableOpacity
      testID={testID}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{
        disabled: disabled || loading,
        busy: loading,
      }}
      style={[
        styles.container,
        variantStyle.container,
        (disabled || loading) && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator color={variantStyle.text.color as string} size="small" />
      ) : (
        <Text style={[styles.text, variantStyle.text]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  disabled: { opacity: 0.5 },
  text: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
});
