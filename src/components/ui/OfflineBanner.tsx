import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing, typography } from '@theme';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppTheme } from '@hooks/useAppTheme';
import { useNetworkStatus } from '@hooks/useNetworkStatus';

export const OfflineBanner = () => {
  const { isConnected } = useNetworkStatus();
  const insets = useSafeAreaInsets();
  const { t } = useTranslation();
  const { colors: themeColors } = useAppTheme();

  if (isConnected) {
    return null;
  }

  return (
    <View
      accessibilityRole="alert"
      style={[
        styles.container,
        {
          backgroundColor: themeColors.error,
          paddingTop: insets.top + spacing.xs,
        },
      ]}
    >
      <Text style={[styles.text, { color: themeColors.onStatus }]}>
        {t('offline.noConnection')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingBottom: spacing.xs,
    paddingHorizontal: spacing.md,
    zIndex: 9999,
    alignItems: 'center',
  },
  text: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
});
