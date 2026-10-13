import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { radii, spacing, typography } from '@theme';
import { useAppTheme } from '@hooks/useAppTheme';
import { crashReporting } from '@services/crashReporting';

type FallbackProps = {
  error: Error;
  resetError: () => void;
};

type ErrorBoundaryProps = {
  children: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  fallback?: React.ComponentType<FallbackProps>;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

// Deliberately not translated: it must still render if i18n is what failed.
const DefaultFallback = ({ error, resetError }: FallbackProps) => {
  const { colors: themeColors } = useAppTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: themeColors.background }]}
    >
      <Text style={styles.emoji}>⚠️</Text>
      <Text style={[styles.title, { color: themeColors.text }]}>
        Something went wrong
      </Text>
      <Text style={[styles.message, { color: themeColors.textSecondary }]}>
        {error.message}
      </Text>
      <TouchableOpacity
        accessibilityRole="button"
        style={[styles.button, { backgroundColor: themeColors.primary }]}
        onPress={resetError}
      >
        <Text style={[styles.buttonText, { color: themeColors.onPrimary }]}>
          Try Again
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    crashReporting.captureException(error, {
      componentStack: errorInfo.componentStack,
    });
    this.props.onError?.(error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      const FallbackComponent = this.props.fallback ?? DefaultFallback;
      return (
        <FallbackComponent
          error={this.state.error}
          resetError={this.resetError}
        />
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  emoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.sm,
  },
  message: {
    fontSize: typography.fontSize.sm,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  button: {
    paddingVertical: spacing.sm + 4,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
  },
  buttonText: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
  },
});
