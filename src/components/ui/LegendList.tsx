import React from 'react';
import {
  I18nManager,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
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
        <Text
          accessibilityRole="header"
          style={[styles.title, { color: themeColors.text }]}
        >
          {title}
        </Text>
      )}
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          accessibilityRole={item.onPress ? 'button' : undefined}
          accessibilityLabel={item.label}
          style={[
            styles.item,
            index < items.length - 1 && {
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: themeColors.border,
            },
          ]}
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
              style={styles.leading}
            />
          ) : (
            <View style={[styles.dot, { backgroundColor: item.color }]} />
          )}
          <Text style={[styles.label, { color: themeColors.text }]}>
            {item.label}
          </Text>
          {item.onPress && (
            <Icon
              family="MaterialIcons"
              name="chevron-right"
              color={themeColors.textTertiary}
              size="sm"
              style={I18nManager.isRTL ? styles.flipped : undefined}
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'left',
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.md,
  },
  label: {
    flex: 1,
    textAlign: 'left',
    fontSize: typography.fontSize.md,
  },
  leading: { marginRight: spacing.md },
  flipped: { transform: [{ scaleX: -1 }] },
});
