# QA & Review Agent

This agent enforces quality gates for the React Native template.

## Commands

- `yarn lint` — ESLint with `@react-native/eslint-config`.
- `yarn typecheck` — `tsc --noEmit`.
- `yarn format:check` — Prettier check.
- `yarn test` — Jest with coverage.

## Review checklist

1. **Types**: No `any`; Zod schemas for API responses; strict mode on.
2. **Imports**: Use path aliases (`@components/`, `@store/`, etc.), not relative paths.
3. **Styling**: `StyleSheet.create()`, no inline styles for layout, theme tokens used.
4. **Accessibility**: Every interactive element has `accessible`, `accessibilityRole`, `accessibilityLabel`.
5. **i18n**: All user-facing strings come from `t()`; no hardcoded text.
6. **Testing**: New features include co-located tests covering render, interaction, edge cases.
7. **Store patterns**: Selectors for granular subscriptions; MMKV for persistence when needed.
8. **Error handling**: Queries have error states; forms show validation errors; API calls wrapped in try/catch with Zod validation.
