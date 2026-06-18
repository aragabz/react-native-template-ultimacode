import React, { useState } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { Button, TextField, Card, LoadingSpinner, EmptyState, Modal, useToastStore } from '@components/ui';
import { colors, spacing, typography } from '@theme';

export const ShowcaseScreen = () => {
  const [textValue, setTextValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const showToast = useToastStore((s) => s.show);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>UI Component Showcase</Text>

      <Card>
        <Text style={styles.sectionTitle}>Button</Text>
        <Button title="Primary" onPress={() => showToast('Primary pressed')} />
        <Button title="Secondary" variant="secondary" onPress={() => showToast('Secondary pressed')} style={{ marginTop: spacing.sm }} />
        <Button title="Outline" variant="outline" onPress={() => showToast('Outline pressed')} style={{ marginTop: spacing.sm }} />
        <Button title="Ghost" variant="ghost" onPress={() => showToast('Ghost pressed')} style={{ marginTop: spacing.sm }} />
        <Button title="Loading" loading onPress={() => {}} style={{ marginTop: spacing.sm }} />
        <Button title="Disabled" disabled onPress={() => {}} style={{ marginTop: spacing.sm }} />
      </Card>

      <Card style={{ marginTop: spacing.md }}>
        <Text style={styles.sectionTitle}>TextField</Text>
        <TextField label="Default" placeholder="Type something..." value={textValue} onChangeText={setTextValue} />
        <TextField label="With Error" value="" onChangeText={() => {}} error="This field is required" />
        <TextField label="Secure" value="" onChangeText={() => {}} secureTextEntry placeholder="Password" />
        <TextField label="Multiline" value="" onChangeText={() => {}} multiline placeholder="Long text..." />
      </Card>

      <Card style={{ marginTop: spacing.md }}>
        <Text style={styles.sectionTitle}>LoadingSpinner</Text>
        <LoadingSpinner size="small" message="Loading..." />
      </Card>

      <Card style={{ marginTop: spacing.md }}>
        <Text style={styles.sectionTitle}>EmptyState</Text>
        <EmptyState
          title="No items found"
          message="Try adjusting your filters or add a new item."
          action={<Button title="Add Item" onPress={() => showToast('Add item pressed')} />}
        />
      </Card>

      <Card style={{ marginTop: spacing.md }}>
        <Text style={styles.sectionTitle}>Modal</Text>
        <Button title="Open Modal" onPress={() => setModalVisible(true)} />
        <Modal visible={modalVisible} onClose={() => setModalVisible(false)} title="Example Modal">
          <Text style={{ color: colors.light.text, marginBottom: spacing.md }}>
            This is a modal with some example content. Press outside or hit X to close.
          </Text>
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </Modal>
      </Card>

      <Card style={{ marginTop: spacing.md }}>
        <Text style={styles.sectionTitle}>Toast</Text>
        <Button title="Show Success" onPress={() => showToast('Operation successful!', 'success')} style={{ marginBottom: spacing.sm }} />
        <Button title="Show Error" variant="outline" onPress={() => showToast('Something went wrong.', 'error')} style={{ marginBottom: spacing.sm }} />
        <Button title="Show Info" variant="ghost" onPress={() => showToast('Here is some info.', 'info')} />
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.light.surface },
  content: { padding: spacing.md, paddingBottom: spacing.xxl },
  title: {
    fontSize: typography.fontSize.xxl,
    fontWeight: typography.fontWeight.bold,
    color: colors.light.text,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.light.text,
    marginBottom: spacing.sm,
  },
});
