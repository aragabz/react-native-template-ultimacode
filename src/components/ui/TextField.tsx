import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { spacing, typography } from '@theme';
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

  return (
    <View style={[styles.wrapper, style]}>
      {label && <Text style={[styles.label, { color: themeColors.text }]}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          {
            borderColor: error ? themeColors.error : themeColors.border,
            color: themeColors.text,
            backgroundColor: themeColors.background,
          },
          multiline && styles.multiline,
        ]}
        placeholder={placeholder}
        placeholderTextColor={themeColors.textSecondary}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
      {error && <Text style={[styles.error, { color: themeColors.error }]}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginBottom: spacing.md },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    marginBottom: spacing.xs,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    fontSize: typography.fontSize.md,
  },
  multiline: { minHeight: 100, paddingTop: spacing.sm + 4 },
  error: {
    fontSize: typography.fontSize.xs,
    marginTop: spacing.xs,
  },
});
