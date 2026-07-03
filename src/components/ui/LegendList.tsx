import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { spacing, typography } from '@theme';
import { useAppTheme } from '@hooks/useAppTheme';
import { Icon } from './Icon';

type LegendIcon = {
  family?: string;
  name: string;
};

type LegendItem = {
  label: string;
  color: string;
  icon?: LegendIcon;
  onPress?: () => void;
};

type LegendListProps = {
  items: LegendItem[];
  title?: string;
};

export const LegendList = ({ items, title }: LegendListProps) => {
  const { colors: themeColors } = useAppTheme();

  return (
    <View>
      {title && (
        <Text style={[styles.title, { color: themeColors.text }]}>
          {title}
        </Text>
      )}
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.item, { borderBottomColor: themeColors.border }]}
          onPress={item.onPress}
          disabled={!item.onPress}
          activeOpacity={0.6}
        >
          {item.icon ? (
            <Icon
              family={item.icon.family as any}
              name={item.icon.name}
              color={item.color}
              size="sm"
            />
          ) : (
            <View style={[styles.dot, { backgroundColor: item.color }]} />
          )}
          <Text style={[styles.label, { color: themeColors.text }]}>
            {item.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginRight: spacing.md,
  },
  label: {
    fontSize: typography.fontSize.lg,
  },
});
