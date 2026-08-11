# Skill: Add a New UI Component

## Steps

1. **Create the component file**

   `src/components/ui/MyComponent.tsx`

   ```tsx
   import { View, Text, StyleSheet } from 'react-native';
   import { spacing, typography } from '@theme';
   import { useAppTheme } from '@hooks/useAppTheme';

   type MyComponentProps = {
     label: string;
   };

   export const MyComponent = ({ label }: MyComponentProps) => {
     const { colors } = useAppTheme();

     return (
       <View style={[styles.container, { backgroundColor: colors.surface }]}>
         <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
       </View>
     );
   };

   const styles = StyleSheet.create({
     container: { padding: spacing.md, borderRadius: 8 },
     label: { fontSize: typography.fontSize.md },
   });
   ```

2. **Export from barrel**

   Add to `src/components/ui/index.ts`:

   ```ts
   export { MyComponent } from './MyComponent';
   ```

3. **Add tests**

   `src/components/ui/__tests__/MyComponent.test.tsx`
