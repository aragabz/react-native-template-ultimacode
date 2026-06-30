import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Button } from '@components/ui';
import { useAppTheme } from '@hooks/useAppTheme';
import { useSettingsStore } from '@store/useSettingsStore';
import { spacing, typography } from '@theme';

const { width } = Dimensions.get('window');

const pages = [
  {
    emoji: '👋',
    title: 'Welcome',
    description: 'Welcome to the app! Let us walk you through the key features.',
  },
  {
    emoji: '🚀',
    title: 'Fast & Reliable',
    description: 'Built with performance in mind. Enjoy a smooth experience.',
  },
  {
    emoji: '🔒',
    title: 'Secure',
    description: 'Your data is encrypted and stored safely on your device.',
  },
];

export const OnboardingScreen = () => {
  const { colors } = useAppTheme();
  const setOnboardingSeen = useSettingsStore((s) => s.setOnboardingSeen);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {pages.map((page, index) => (
          <View key={index} testID={`onboarding-page-${index}`} style={styles.page}>
            <Text style={styles.emoji}>{page.emoji}</Text>
            <Text
              accessibilityRole="header"
              style={[styles.title, { color: colors.text }]}
            >
              {page.title}
            </Text>
            <Text style={[styles.description, { color: colors.textSecondary }]}>
              {page.description}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Button title="Get Started" onPress={() => setOnboardingSeen(true)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  page: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  emoji: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  description: {
    fontSize: typography.fontSize.md,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
});
