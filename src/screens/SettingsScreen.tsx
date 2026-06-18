import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore, selectIsAuthenticated } from '@store/useAuthStore';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@navigation/types';
import { Button, Card } from '@components/ui';
import { colors, spacing } from '@theme';

export const SettingsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const logout = useAuthStore((s) => s.logout);

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details', { id: '99', title: 'From Settings' })}
        />
        {isAuthenticated && (
          <Button
            title="Log Out"
            variant="outline"
            onPress={logout}
            style={{ marginTop: spacing.md }}
          />
        )}
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.light.background,
    padding: spacing.md,
  },
  card: { width: '100%' },
});
