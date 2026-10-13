import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { spacing, typography } from '@theme';
import { useTranslation } from 'react-i18next';
import { usePosts, Post } from '@api/hooks/usePosts';
import { Button, Card, LegendList as RowList, Screen } from '@components/ui';
import { useAppTheme } from '@hooks/useAppTheme';
import { LegendList } from '@legendapp/list/react-native';
import type { RootStackParamList } from '@navigation/types';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCounterStore } from '@store/useCounterStore';
import { useThemeStore } from '@store/useThemeStore';

export const ExamplesScreen = () => {
  const { t } = useTranslation();
  const { count, increment, decrement } = useCounterStore();
  const { mode, setMode } = useThemeStore();
  const { colors: themeColors } = useAppTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const { data: posts, isLoading, isError, error, refetch } = usePosts();

  const toggleTheme = () => {
    const nextMode =
      mode === 'light' ? 'dark' : mode === 'dark' ? 'system' : 'light';
    setMode(nextMode);
  };

  const renderPost = ({ item }: { item: Post }) => (
    <View style={[styles.postItem, { borderBottomColor: themeColors.border }]}>
      <Text
        numberOfLines={1}
        style={[styles.postTitle, { color: themeColors.text }]}
      >
        {item.title}
      </Text>
    </View>
  );

  return (
    <Screen scroll={false}>
      <Card style={styles.section}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
          {t('demo.zustandSection')}
        </Text>
        <View style={styles.counterRow}>
          <Button
            title="−"
            variant="secondary"
            onPress={decrement}
            style={styles.stepper}
          />
          <Text style={[styles.counter, { color: themeColors.text }]}>
            {t('demo.counter', { count })}
          </Text>
          <Button
            title="+"
            variant="secondary"
            onPress={increment}
            style={styles.stepper}
          />
        </View>
        <View style={styles.themeRow}>
          <Text style={[styles.text, { color: themeColors.textSecondary }]}>
            {t('demo.themeMode', { mode: t(`settings.${mode}`) })}
          </Text>
          <Button
            title={t('demo.toggleMode')}
            variant="ghost"
            onPress={toggleTheme}
          />
        </View>
      </Card>

      <Card style={[styles.section, styles.postsCard]}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
          {t('demo.tanstackSection')}
        </Text>
        {isLoading ? (
          <ActivityIndicator size="large" color={themeColors.primary} />
        ) : isError ? (
          <View>
            <Text
              style={[
                styles.text,
                { color: themeColors.error, marginBottom: spacing.sm },
              ]}
            >
              {error?.message ?? t('demo.errorFetching')}
            </Text>
            <Button
              title={t('demo.retry')}
              variant="outline"
              onPress={() => refetch()}
            />
          </View>
        ) : (
          <LegendList
            data={posts}
            recycleItems={true}
            extraData={themeColors}
            renderItem={renderPost}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </Card>

      <Card style={[styles.section, styles.examplesCard]}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
          {t('demo.examplesSection')}
        </Text>
        <RowList
          items={[
            {
              label: t('demo.listDetailExample'),
              icon: { family: 'MaterialIcons', name: 'view-list' },
              color: themeColors.primary,
              onPress: () => navigation.navigate('List'),
            },
            {
              label: t('demo.formsExample'),
              icon: { family: 'MaterialIcons', name: 'assignment' },
              color: themeColors.primary,
              onPress: () => navigation.navigate('Forms'),
            },
            {
              label: t('demo.offlineExample'),
              icon: { family: 'MaterialIcons', name: 'cloud-off' },
              color: themeColors.primary,
              onPress: () => navigation.navigate('Offline'),
            },
            {
              label: t('demo.settingsExample'),
              icon: { family: 'MaterialIcons', name: 'settings' },
              color: themeColors.primary,
              onPress: () =>
                navigation.navigate('Main', { screen: 'Settings' }),
            },
          ]}
        />
      </Card>
    </Screen>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing.md,
  },
  postsCard: {
    flex: 1,
  },
  examplesCard: {
    paddingVertical: spacing.sm,
  },
  sectionTitle: {
    textAlign: 'left',
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.sm,
  },
  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepper: {
    minWidth: 56,
    paddingHorizontal: spacing.md,
  },
  counter: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
  },
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  text: {
    textAlign: 'left',
    fontSize: typography.fontSize.sm,
  },
  postItem: {
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  postTitle: {
    textAlign: 'left',
    fontSize: typography.fontSize.sm,
  },
});
