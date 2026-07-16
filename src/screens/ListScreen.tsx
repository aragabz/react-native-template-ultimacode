import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { usePosts, Post } from '@api/hooks/usePosts';
import { Button, Card, EmptyState, LoadingSpinner, TextField } from '@components/ui';
import { LegendList } from '@legendapp/list/react-native';
import { useAppTheme } from '@hooks/useAppTheme';
import type { RootStackParamList } from '@navigation/types';
import { spacing, typography } from '@theme';

export const ListScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { colors: themeColors } = useAppTheme();
  const [query, setQuery] = useState('');
  const { data: posts = [], isLoading, isError, error, refetch, isFetching } = usePosts();

  const filteredPosts = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) {
      return posts;
    }

    return posts.filter((post) =>
      post.title.toLowerCase().includes(search) || post.body.toLowerCase().includes(search),
    );
  }, [posts, query]);

  const renderPost = ({ item }: { item: Post }) => (
    <Card style={[styles.postCard, { backgroundColor: themeColors.surface }]}>
      <Text style={[styles.postTitle, { color: themeColors.text }]}>{item.title}</Text>
      <Text style={[styles.postBody, { color: themeColors.textSecondary }]} numberOfLines={3}>
        {item.body}
      </Text>
      <Button
        title={t('list.openDetails')}
        variant="outline"
        style={styles.postButton}
        onPress={() => navigation.navigate('Details', { id: String(item.id), title: item.title })}
      />
    </Card>
  );

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <Text style={[styles.title, { color: themeColors.text }]}>{t('list.title')}</Text>
      <TextField
        label={t('list.searchLabel')}
        placeholder={t('list.searchPlaceholder')}
        value={query}
        onChangeText={setQuery}
      />

      {isLoading ? (
        <LoadingSpinner message={t('list.loading')} />
      ) : isError ? (
        <EmptyState
          title={t('list.errorTitle')}
          message={error?.message ?? t('list.errorMessage')}
          action={<Button title={t('list.retry')} onPress={() => refetch()} />}
        />
      ) : filteredPosts.length === 0 ? (
        <EmptyState
          title={t('list.emptyTitle')}
          message={t('list.emptyMessage')}
          action={<Button title={t('list.clearSearch')} onPress={() => setQuery('')} />}
        />
      ) : (
        <LegendList
          data={filteredPosts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPost}
          recycleItems={true}
          contentContainerStyle={styles.listContent}
        />
      )}
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
    marginBottom: spacing.md,
  },
  listContent: {
    paddingBottom: spacing.xxl,
  },
  postCard: {
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  postTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.xs,
  },
  postBody: {
    fontSize: typography.fontSize.sm,
    lineHeight: 20,
    marginBottom: spacing.md,
  },
  postButton: {
    alignSelf: 'flex-start',
  },
});
