import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing } from '@theme';
import { useAppTheme } from '@hooks/useAppTheme';

type CardProps = {
  children: React.ReactNode;
  style?: object;
};

export const Card = ({ children, style }: CardProps) => {
  const { colors: themeColors, isDark } = useAppTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: themeColors.background,
          borderColor: themeColors.border,
          shadowColor: isDark ? '#fff' : '#000',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    padding: spacing.md,
    borderWidth: 1,
    elevation: 2,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
