import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { radii, spacing, typography } from '@theme';
import { useAppTheme } from '@hooks/useAppTheme';

type TextFieldProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  multiline?: boolean;
  style?: object;
};

export const TextField = ({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  secureTextEntry,
  autoCapitalize,
  keyboardType = 'default',
  multiline,
  style,
}: TextFieldProps) => {
  const { colors: themeColors } = useAppTheme();
  const [focused, setFocused] = useState(false);
  const borderColor = error
    ? themeColors.error
    : focused
      ? themeColors.primary
      : 'transparent';

  return (
    <View style={[styles.wrapper, style]}>
      {label && (
        <Text style={[styles.label, { color: themeColors.textSecondary }]}>
          {label}
        </Text>
      )}
      <TextInput
        accessible={true}
        accessibilityLabel={label}
        accessibilityHint={error ?? placeholder}
        accessibilityState={{ disabled: false, selected: false }}
        style={[
          styles.input,
          {
            borderColor,
            color: themeColors.text,
            backgroundColor: themeColors.surfaceSecondary,
          },
          multiline && styles.multiline,
        ]}
        placeholder={placeholder}
        placeholderTextColor={themeColors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
      {error && (
        <Text
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
          style={[styles.error, { color: themeColors.error }]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginBottom: spacing.md },
  label: {
    textAlign: 'left',
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing.xs + 2,
  },
  input: {
    borderWidth: 1.5,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    fontSize: typography.fontSize.md,
  },
  multiline: { minHeight: 100, paddingTop: spacing.sm + 4 },
  error: {
    textAlign: 'left',
    fontSize: typography.fontSize.xs,
    marginTop: spacing.xs,
  },
});
