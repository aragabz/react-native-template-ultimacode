import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { spacing, typography } from '@theme';
import { useTranslation } from 'react-i18next';
import { usePosts, Post } from '@api/hooks/usePosts';
import { useAppTheme } from '@hooks/useAppTheme';
import { useCounterStore } from '@store/useCounterStore';
import { useThemeStore } from '@store/useThemeStore';
import { Card } from '@components/ui';
import { LegendList } from '@legendapp/list/react-native';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { TabParamList } from '@navigation/types';


export const DemoScreen = () => {
  const { t } = useTranslation();
  const { count, increment, decrement } = useCounterStore();
  const { mode, setMode } = useThemeStore();
  const { colors: themeColors } = useAppTheme();
  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();

  const { data: posts, isLoading, isError, error, refetch } = usePosts();

  const toggleTheme = () => {
    const nextMode = mode === 'light' ? 'dark' : mode === 'dark' ? 'system' : 'light';
    setMode(nextMode);
  };

  const renderPost = ({ item }: { item: Post }) => (
    <View style={[styles.postItem, { borderBottomColor: themeColors.border }]}>
      <Text style={[styles.postTitle, { color: themeColors.text }]}>
        {item.title}
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[styles.title, { color: themeColors.text }]}>
        {t('demo.title')}
      </Text>

      <View style={[styles.section, { backgroundColor: themeColors.surface }]}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
          {t('demo.zustandSection')}
        </Text>
        <Text style={[styles.text, { color: themeColors.text }]}>
          {t('demo.counter', { count })}
        </Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.primary }]} onPress={decrement}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.primary }]} onPress={increment}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.text, { color: themeColors.text, marginTop: spacing.md }]}>
          {t('demo.themeMode', { mode: mode.toUpperCase() })}
        </Text>
        <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.primary, marginTop: spacing.sm }]} onPress={toggleTheme}>
          <Text style={styles.buttonText}>{t('demo.toggleMode')}</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.section, { flex: 1, backgroundColor: themeColors.surface }]}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
          {t('demo.tanstackSection')}
        </Text>
        {isLoading ? (
          <ActivityIndicator size="large" color={themeColors.primary} />
        ) : isError ? (
          <View>
            <Text style={{ color: themeColors.error, marginBottom: spacing.sm }}>
              {error?.message ?? t('demo.errorFetching')}
            </Text>
            <TouchableOpacity style={[styles.button, { backgroundColor: themeColors.primary }]} onPress={() => refetch()}>
              <Text style={styles.buttonText}>{t('demo.retry')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <LegendList
            data={posts}
            recycleItems={true}
            renderItem={renderPost}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>

      <Card style={[styles.section, { backgroundColor: themeColors.surface }]}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
          {t('demo.examplesSection')}
        </Text>
        <TouchableOpacity style={[styles.linkButton, { backgroundColor: themeColors.primary }]} onPress={() => navigation.navigate('List')}>
          <Text style={styles.buttonText}>{t('demo.listDetailExample')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.linkButton, { backgroundColor: themeColors.primary }]} onPress={() => navigation.navigate('Forms')}>
          <Text style={styles.buttonText}>{t('demo.formsExample')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.linkButton, { backgroundColor: themeColors.primary }]} onPress={() => navigation.navigate('Offline')}>
          <Text style={styles.buttonText}>{t('demo.offlineExample')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.linkButton, { backgroundColor: themeColors.primary }]} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.buttonText}>{t('demo.settingsExample')}</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  section: {
    marginBottom: spacing.lg,
    padding: spacing.md,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.sm,
  },
  text: {
    fontSize: typography.fontSize.md,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  button: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.sm,
  },
  buttonText: {
    color: '#fff',
    fontWeight: typography.fontWeight.semibold,
  },
  postItem: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
  },
  postTitle: {
    fontSize: typography.fontSize.sm,
  },
  listContent: {
    paddingBottom: spacing.sm,
  },
});
