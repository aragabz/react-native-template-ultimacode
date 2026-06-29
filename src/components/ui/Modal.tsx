import React from 'react';
import {
  Modal as RNModal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import { spacing, typography } from '@theme';
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
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable
          style={[styles.content, { backgroundColor: themeColors.background }]}
          onPress={() => {}}
        >
          {title && (
            <View style={styles.header}>
              <Text style={[styles.title, { color: themeColors.text }]}>{title}</Text>
              <TouchableOpacity onPress={onClose}>
                <Text style={[styles.close, { color: themeColors.textSecondary }]}>X</Text>
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  content: {
    width: '100%',
    borderRadius: 12,
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
