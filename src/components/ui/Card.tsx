import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '@theme';

type CardProps = {
  children: React.ReactNode;
  style?: object;
};

export const Card = ({ children, style }: CardProps) => {
  const themeColors = colors.light;

  return (
    <View style={[styles.card, { backgroundColor: themeColors.background, borderColor: themeColors.border }, style]}>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
