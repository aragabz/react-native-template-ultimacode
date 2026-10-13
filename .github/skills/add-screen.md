# Skill: Add a New Screen

## Steps

1. **Create the screen file** in its feature folder

   `src/screens/my-feature/MyScreen.tsx`

   ```tsx
   import { Text, StyleSheet } from 'react-native';
   import { typography } from '@theme';
   import { Card, Screen } from '@components/ui';
   import { useAppTheme } from '@hooks/useAppTheme';
   import { useTranslation } from 'react-i18next';

   export const MyScreen = () => {
     const { colors } = useAppTheme();
     const { t } = useTranslation();

     return (
       <Screen>
         <Card>
           <Text style={[styles.body, { color: colors.text }]}>{t('my.body')}</Text>
         </Card>
       </Screen>
     );
   };

   const styles = StyleSheet.create({
     body: { textAlign: 'left', fontSize: typography.fontSize.md },
   });
   ```

   - `<Screen>` provides the background, padding and scrolling. Pass `scroll={false}` if the
     screen renders its own list, `centered` for empty/detail states.
   - Don't render a big title in the content — the navigator header shows it.
   - Use `textAlign: 'left'` on block text so it mirrors correctly in RTL.

2. **Export it** from `src/screens/index.ts`:

   ```ts
   export { MyScreen } from './my-feature/MyScreen';
   ```

3. **Add the route type** in `src/navigation/types.ts` — `RootStackParamList` for a pushed
   screen (most screens), `TabParamList` only for a new top-level destination (keep tabs ≤ 5).

4. **Register it**

   - Pushed: in `RootNavigator.tsx`,
     `<Stack.Screen name="My" component={MyScreen} options={pushed(t('navigation.my'))} />`
   - Tab: in `TabNavigator.tsx`, add a `<Tab.Screen>` and an entry in `TAB_ICONS`; the label
     comes from `navigation.<routename lowercase>`.
   - Deep link: add a path in `src/navigation/linking.ts`.

5. **Add i18n keys** to both `src/i18n/en.json` and `src/i18n/ar.json`.

6. **Add tests** in `src/screens/my-feature/__tests__/MyScreen.test.tsx`.
