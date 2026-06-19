import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@navigation/types';
import { Button, Card } from '@components/ui';
import { colors, spacing, typography } from '@theme';

export const HomeScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>{t('home.title')}</Text>
        <Button
          title={t('home.goToDetails')}
          onPress={() => navigation.navigate('Details', { id: '42', title: 'From Home' })}
        />
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
  card: { width: '100%', alignItems: 'center' },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.light.text,
    marginBottom: spacing.md,
  },
});
