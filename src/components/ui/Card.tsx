import React from 'react';
import { View, StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import { elevation, radii, spacing } from '@theme';
import { useAppTheme } from '@hooks/useAppTheme';

type CardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const Card = ({ children, style }: CardProps) => {
  const { colors: themeColors, isDark } = useAppTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: themeColors.surface },
        // Shadows vanish on black, so dark mode separates cards with a hairline instead.
        isDark
          ? {
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: themeColors.border,
            }
          : { ...elevation.sm, shadowColor: themeColors.shadow },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.lg,
    padding: spacing.md,
  },
});
