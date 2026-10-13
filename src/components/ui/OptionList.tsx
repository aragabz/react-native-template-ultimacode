import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { spacing, typography } from '@theme';
import { useAppTheme } from '@hooks/useAppTheme';
import { Icon } from './Icon';

type Option<T extends string> = {
  value: T;
  label: string;
};

type OptionListProps<T extends string> = {
  options: Option<T>[];
  selected: T;
  onSelect: (value: T) => void;
  accessibilityLabel?: string;
};

/** Single-choice list (radio group) with a checkmark on the selected row. */
export const OptionList = <T extends string>({
  options,
  selected,
  onSelect,
  accessibilityLabel,
}: OptionListProps<T>) => {
  const { colors: themeColors } = useAppTheme();

  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={accessibilityLabel}
    >
      {options.map((option, index) => {
        const isSelected = option.value === selected;
        return (
          <TouchableOpacity
            key={option.value}
            accessibilityRole="radio"
            accessibilityState={{ checked: isSelected }}
            accessibilityLabel={option.label}
            onPress={() => onSelect(option.value)}
            activeOpacity={0.6}
            style={[
              styles.row,
              index < options.length - 1 && {
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderBottomColor: themeColors.border,
              },
            ]}
          >
            <Text style={[styles.label, { color: themeColors.text }]}>
              {option.label}
            </Text>
            {isSelected && (
              <Icon
                family="MaterialIcons"
                name="check"
                color={themeColors.primary}
                size="sm"
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 48,
    paddingVertical: spacing.sm,
  },
  label: {
    flex: 1,
    textAlign: 'left',
    fontSize: typography.fontSize.md,
  },
});
