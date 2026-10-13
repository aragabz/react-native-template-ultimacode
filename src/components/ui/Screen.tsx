import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { spacing } from '@theme';
import { useAppTheme } from '@hooks/useAppTheme';

type ScreenProps = {
  children: React.ReactNode;
  /** Wrap content in a ScrollView. Turn off when the screen hosts its own list. */
  scroll?: boolean;
  /** Center content vertically and horizontally (empty/detail states). */
  centered?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  testID?: string;
};

/**
 * Standard screen container: themed background, consistent padding, and
 * scrolling. Titles come from the navigator header, not from screen content.
 */
export const Screen = ({
  children,
  scroll = true,
  centered = false,
  contentStyle,
  testID,
}: ScreenProps) => {
  const { colors: themeColors } = useAppTheme();
  const background = { backgroundColor: themeColors.background };

  if (!scroll) {
    return (
      <View
        testID={testID}
        style={[
          styles.fill,
          styles.content,
          background,
          centered && styles.centered,
          contentStyle,
        ]}
      >
        {children}
      </View>
    );
  }

  return (
    <ScrollView
      testID={testID}
      style={[styles.fill, background]}
      contentContainerStyle={[
        styles.content,
        styles.scrollContent,
        centered && styles.centered,
        contentStyle,
      ]}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  fill: { flex: 1 },
  content: { padding: spacing.md },
  scrollContent: { flexGrow: 1, paddingBottom: spacing.xl },
  centered: { justifyContent: 'center', alignItems: 'center' },
});
