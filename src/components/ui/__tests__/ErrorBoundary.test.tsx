import React from 'react';
import { Text, View } from 'react-native';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { ErrorBoundary } from '../ErrorBoundary';

const ThrowingComponent = ({ shouldThrow = true }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <Text>Child content</Text>;
};

// Suppress console.error for expected errors in tests
const originalConsoleError = console.error;
beforeEach(() => {
  console.error = jest.fn();
});
afterEach(() => {
  console.error = originalConsoleError;
});

describe('ErrorBoundary', () => {
  it('renders children when no error is thrown', async () => {
    const { getByText } = await render(
      <ErrorBoundary>
        <ThrowingComponent shouldThrow={false} />
      </ErrorBoundary>,
    );
    expect(getByText('Child content')).toBeTruthy();
  });

  it('renders fallback UI when a child throws', async () => {
    const { getByText } = await render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>,
    );
    expect(getByText('Something went wrong')).toBeTruthy();
  });

  it('displays the error message in fallback UI', async () => {
    const { getByText } = await render(
      <ErrorBoundary>
        <ThrowingComponent />
      </ErrorBoundary>,
    );
    expect(getByText('Test error')).toBeTruthy();
  });

  it('provides a retry button that resets the boundary', async () => {
    let shouldThrow = true;
    const DynamicThrower = () => {
      if (shouldThrow) {
        throw new Error('Temporary error');
      }
      return <Text>Recovered</Text>;
    };

    const { getByText } = await render(
      <ErrorBoundary>
        <DynamicThrower />
      </ErrorBoundary>,
    );

    expect(getByText('Something went wrong')).toBeTruthy();

    // Fix the error before retrying
    shouldThrow = false;
    fireEvent.press(getByText('Try Again'));

    await waitFor(() => {
      expect(getByText('Recovered')).toBeTruthy();
    });
  });

  it('calls onError callback when an error is caught', async () => {
    const onError = jest.fn();

    await render(
      <ErrorBoundary onError={onError}>
        <ThrowingComponent />
      </ErrorBoundary>,
    );

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({ componentStack: expect.any(String) }),
    );
  });

  it('renders custom fallback when provided', async () => {
    const CustomFallback = ({ error, resetError: _resetError }: { error: Error; resetError: () => void }) => (
      <View>
        <Text>Custom: {error.message}</Text>
      </View>
    );

    const { getByText, queryByText } = await render(
      <ErrorBoundary fallback={CustomFallback}>
        <ThrowingComponent />
      </ErrorBoundary>,
    );

    expect(getByText('Custom: Test error')).toBeTruthy();
    expect(queryByText('Something went wrong')).toBeNull();
  });

  it('does not render fallback UI when no error occurs', async () => {
    const { queryByText, getByText } = await render(
      <ErrorBoundary>
        <ThrowingComponent shouldThrow={false} />
      </ErrorBoundary>,
    );

    expect(getByText('Child content')).toBeTruthy();
    expect(queryByText('Something went wrong')).toBeNull();
    expect(queryByText('Try Again')).toBeNull();
  });
});
