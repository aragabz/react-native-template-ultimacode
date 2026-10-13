import React from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { elevation, radii, spacing, typography } from '@theme';
import { useAppTheme } from '@hooks/useAppTheme';

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export const Modal = ({ visible, onClose, title, children }: ModalProps) => {
  const { colors: themeColors } = useAppTheme();

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable
        style={[styles.overlay, { backgroundColor: themeColors.overlay }]}
        onPress={onClose}
      >
        <Pressable
          accessible={true}
          role="dialog"
          aria-modal
          accessibilityLabel={title}
          style={[
            styles.content,
            {
              backgroundColor: themeColors.surface,
              shadowColor: themeColors.shadow,
            },
          ]}
          onPress={() => {}}
        >
          {title && (
            <View style={styles.header}>
              <Text style={[styles.title, { color: themeColors.text }]}>
                {title}
              </Text>
              <TouchableOpacity
                onPress={onClose}
                accessibilityRole="button"
                accessibilityLabel="Close"
              >
                <Text
                  style={[styles.close, { color: themeColors.textSecondary }]}
                >
                  X
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {children}
        </Pressable>
      </Pressable>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  content: {
    width: '100%',
    borderRadius: radii.lg,
    ...elevation.md,
    padding: spacing.lg,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
  },
  close: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    padding: spacing.xs,
  },
});
// test
