# Skill: Add a New Screen

## Steps

1. **Create the screen file**

   `src/screens/MyScreen.tsx`

   ```tsx
   import { View, Text, StyleSheet } from 'react-native';
   import { spacing, typography } from '@theme';
   import { useAppTheme } from '@hooks/useAppTheme';
   import { useTranslation } from 'react-i18next';

   type MyScreenProps = { /* if stack screen: RootStackScreenProps<'My'> */ };

   export const MyScreen = (/* props: MyScreenProps */) => {
     const { colors } = useAppTheme();
     const { t } = useTranslation();

     return (
       <View style={[styles.container, { backgroundColor: colors.background }]}>
         <Text style={[styles.title, { color: colors.text }]}>
           {t('my.title')}
         </Text>
       </View>
     );
   };

   const styles = StyleSheet.create({
     container: { flex: 1, padding: spacing.md },
     title: { fontSize: typography.fontSize.xl, fontWeight: typography.fontWeight.bold },
   });
   ```

2. **Add route param type**

   In `src/navigation/types.ts`:

   ```ts
   export type RootStackParamList = {
     // ... existing
     My: undefined;
   };

   export type TabParamList = {
     // ... existing
     MyTab: undefined;
   };
   ```

3. **Register in navigator**

   For stack: add `<Stack.Screen name="My" component={MyScreen} />` in `RootNavigator.tsx`.
   For tab: add `<Tab.Screen name="MyTab" component={MyScreen} />` in `TabNavigator.tsx`.

4. **Add i18n keys**

   ```json
   { "my": { "title": "My Screen" } }
   ```

5. **Add tests**

   `src/screens/__tests__/MyScreen.test.tsx` — test render, navigation, and interactions.
