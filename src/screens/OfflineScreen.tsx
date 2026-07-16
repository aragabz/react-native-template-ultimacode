import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button, Card, EmptyState } from '@components/ui';
import { useAppTheme } from '@hooks/useAppTheme';
import { useNetworkStatus } from '@hooks/useNetworkStatus';
import { spacing, typography } from '@theme';

export const OfflineScreen = () => {
  const { t } = useTranslation();
  const { colors: themeColors } = useAppTheme();
  const { isConnected, type } = useNetworkStatus();
  const [previewOffline, setPreviewOffline] = useState(false);

  const offline = previewOffline || !isConnected;

  return (
    <ScrollView style={[styles.container, { backgroundColor: themeColors.background }]} contentContainerStyle={styles.content}>
      <Text style={[styles.title, { color: themeColors.text }]}>{t('offline.title')}</Text>

      <Card style={[styles.card, { backgroundColor: themeColors.surface }]}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('offline.status')}</Text>
        <Text style={[styles.statusText, { color: offline ? themeColors.error : themeColors.success }]}>
          {offline ? t('offline.offline') : t('offline.online')}
        </Text>
        <Text style={[styles.helperText, { color: themeColors.textSecondary }]}>
          {t('offline.connectionType', { type })}
        </Text>
        <View style={styles.actions}>
          <Button
            title={previewOffline ? t('offline.showOnline') : t('offline.simulateOffline')}
            variant="outline"
            onPress={() => setPreviewOffline((current) => !current)}
          />
        </View>
      </Card>

      {offline ? (
        <EmptyState
          title={t('offline.fallbackTitle')}
          message={t('offline.fallbackMessage')}
          action={<Button title={t('offline.retryPreview')} onPress={() => setPreviewOffline(false)} />}
        />
      ) : (
        <Card style={[styles.card, { backgroundColor: themeColors.surface }]}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('offline.cachedTitle')}</Text>
          <Text style={[styles.helperText, { color: themeColors.textSecondary }]}>
            {t('offline.cachedMessage')}
          </Text>
          <Button
            title={t('offline.refresh')}
            onPress={() => setPreviewOffline(false)}
            variant="secondary"
            style={styles.refreshButton}
          />
        </Card>
      )}

      <Card style={[styles.card, { backgroundColor: themeColors.surface }]}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('offline.bannerNoteTitle')}</Text>
        <Text style={[styles.helperText, { color: themeColors.textSecondary }]}>
          {t('offline.bannerNote')}
        </Text>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md,
  },
  card: {
    marginTop: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.xs,
  },
  statusText: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  helperText: {
    fontSize: typography.fontSize.md,
    lineHeight: 20,
  },
  actions: {
    marginTop: spacing.md,
  },
  refreshButton: {
    marginTop: spacing.md,
    alignSelf: 'flex-start',
  },
});
