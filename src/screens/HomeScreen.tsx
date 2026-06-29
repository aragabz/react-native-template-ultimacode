import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { spacing, typography } from '@theme';
import { useTranslation } from 'react-i18next';
import { Button, Card } from '@components/ui';
import { useAppTheme } from '@hooks/useAppTheme';
import type { RootStackParamList } from '@navigation/types';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const HomeScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors: themeColors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Card style={styles.card}>
        <Text style={[styles.title, { color: themeColors.text }]}>{t('home.title')}</Text>
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
    padding: spacing.md,
  },
  card: { width: '100%', alignItems: 'center' },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md,
  },
});
