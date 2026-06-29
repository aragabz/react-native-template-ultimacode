import React, { useState } from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { spacing, typography } from '@theme';
import { useTranslation } from 'react-i18next';
import { Button, TextField, Card, LoadingSpinner, EmptyState, Modal, Icon, useToastStore } from '@components/ui';
import { useAppTheme } from '@hooks/useAppTheme';

export const ShowcaseScreen = () => {
  const { t } = useTranslation();
  const [textValue, setTextValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const showToast = useToastStore((s) => s.show);
  const { colors: themeColors } = useAppTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: themeColors.surface }]}
      contentContainerStyle={styles.content}
    >
      <Text style={[styles.title, { color: themeColors.text }]}>{t('showcase.title')}</Text>

      <Card>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('showcase.buttonSection')}</Text>
        <Button title={t('showcase.primary')} onPress={() => showToast(t('showcase.primaryPressed'))} />
        <Button title={t('showcase.secondary')} variant="secondary" onPress={() => showToast(t('showcase.secondaryPressed'))} style={{ marginTop: spacing.sm }} />
        <Button title={t('showcase.outline')} variant="outline" onPress={() => showToast(t('showcase.outlinePressed'))} style={{ marginTop: spacing.sm }} />
        <Button title={t('showcase.ghost')} variant="ghost" onPress={() => showToast(t('showcase.ghostPressed'))} style={{ marginTop: spacing.sm }} />
        <Button title={t('showcase.loading')} loading onPress={() => {}} style={{ marginTop: spacing.sm }} />
        <Button title={t('showcase.disabled')} disabled onPress={() => {}} style={{ marginTop: spacing.sm }} />
      </Card>

      <Card style={{ marginTop: spacing.md }}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('showcase.textFieldSection')}</Text>
        <TextField label={t('showcase.defaultLabel')} placeholder={t('showcase.typeSomething')} value={textValue} onChangeText={setTextValue} />
        <TextField label={t('showcase.withErrorLabel')} value="" onChangeText={() => {}} error={t('showcase.requiredError')} />
        <TextField label={t('showcase.secureLabel')} value="" onChangeText={() => {}} secureTextEntry placeholder={t('auth.login.password')} />
        <TextField label={t('showcase.multilineLabel')} value="" onChangeText={() => {}} multiline placeholder={t('showcase.longText')} />
      </Card>

      <Card style={{ marginTop: spacing.md }}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('showcase.loadingSection')}</Text>
        <LoadingSpinner size="small" message={t('showcase.loadingMessage')} />
      </Card>

      <Card style={{ marginTop: spacing.md }}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('showcase.emptyStateSection')}</Text>
        <EmptyState
          title={t('showcase.noItemsTitle')}
          message={t('showcase.noItemsMessage')}
          action={<Button title={t('showcase.addItem')} onPress={() => showToast(t('showcase.addItemPressed'))} />}
        />
      </Card>

      <Card style={{ marginTop: spacing.md }}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('showcase.modalSection')}</Text>
        <Button title={t('showcase.openModal')} onPress={() => setModalVisible(true)} />
        <Modal visible={modalVisible} onClose={() => setModalVisible(false)} title={t('showcase.modalTitle')}>
          <Text style={{ color: themeColors.text, marginBottom: spacing.md }}>
            {t('showcase.modalContent')}
          </Text>
          <Button title={t('showcase.close')} onPress={() => setModalVisible(false)} />
        </Modal>
      </Card>

      <Card style={{ marginTop: spacing.md }}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('showcase.toastSection')}</Text>
        <Button title={t('showcase.showSuccess')} onPress={() => showToast(t('showcase.successMessage'), 'success')} style={{ marginBottom: spacing.sm }} />
        <Button title={t('showcase.showError')} variant="outline" onPress={() => showToast(t('showcase.errorMessage'), 'error')} style={{ marginBottom: spacing.sm }} />
        <Button title={t('showcase.showInfo')} variant="ghost" onPress={() => showToast(t('showcase.infoMessage'), 'info')} />
      </Card>

      <Card style={{ marginTop: spacing.md }}>
        <Text style={[styles.sectionTitle, { color: themeColors.text }]}>{t('showcase.iconsSection')}</Text>
        <View style={styles.iconRow}>
          <Icon family="MaterialIcons" name="home" size="md" color={themeColors.primary} />
          <Icon family="MaterialCommunityIcons" name="heart" size="md" color={themeColors.error} />
          <Icon family="Ionicons" name="person-circle" size="md" color={themeColors.text} />
          <Icon family="FontAwesome" name="star" size="md" color={themeColors.text} />
          <Icon family="Feather" name="search" size="md" color={themeColors.text} />
          <Icon family="AntDesign" name="setting" size="md" color={themeColors.text} />
        </View>
        <View style={{ ...styles.iconRow, marginTop: spacing.sm }}>
          <Icon name="favorite" size="sm" />
          <Icon name="favorite" size="md" />
          <Icon name="favorite" size="lg" />
          <Icon name="favorite" size="xl" />
        </View>
        <View style={{ ...styles.iconRow, marginTop: spacing.sm }}>
          <Icon family="MaterialIcons" name="check-circle" color={themeColors.success} />
          <Icon family="MaterialIcons" name="error" color={themeColors.error} />
          <Icon family="MaterialIcons" name="info" color={themeColors.primary} />
          <Icon family="MaterialIcons" name="warning" color="#FF9500" />
        </View>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: spacing.md, paddingBottom: spacing.xxl },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    marginBottom: spacing.sm,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
