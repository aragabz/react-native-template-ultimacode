# Implementation Plan: Template Enhancements — Reliability, DX, and Production Readiness

## Phase 1: Reliability & Error Handling

- [x] Task: Write Tests: React Error Boundary component with fallback UI [207cf53]
- [x] Task: Implement Feature: React Error Boundary with crash report hook [207cf53]
- [ ] Task: Write Tests: Token refresh interceptor (queue, retry, logout on failure)
- [ ] Task: Implement Feature: Axios token refresh logic with request queuing
- [ ] Task: Write Tests: QueryClient configuration (staleTime, gcTime, retry)
- [ ] Task: Implement Feature: Configure QueryClient with production-ready defaults
- [ ] Task: Write Tests: useNetworkStatus hook and offline banner
- [ ] Task: Implement Feature: Network status hook using NetInfo + offline UI banner
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Reliability & Error Handling' (Protocol in workflow.md)

## Phase 2: Type Safety & Validation

- [ ] Task: Enable TypeScript strict mode and fix all resulting type errors
- [ ] Task: Write Tests: Zod schemas for API responses (LoginResponse, Post, User)
- [ ] Task: Implement Feature: Zod validation in service layer for all endpoints
- [ ] Task: Implement Feature: Enhanced ESLint config (import ordering, hooks rules, unused imports)
- [ ] Task: Run full lint pass and fix all new violations
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Type Safety & Validation' (Protocol in workflow.md)

## Phase 3: Testing & CI/CD

- [ ] Task: Write Tests: useAuthStore (login, logout, hydration, hybrid storage)
- [ ] Task: Write Tests: useThemeStore and useSettingsStore
- [ ] Task: Write Tests: useCounterStore
- [ ] Task: Write Tests: useAppTheme hook
- [ ] Task: Write Tests: usePosts hook (success, error, loading states)
- [ ] Task: Write Tests: apiClient interceptors (auth header, 401 handling)
- [ ] Task: Write Tests: UI components (Button, Card, TextField, Modal, Toast, EmptyState, LoadingSpinner)
- [ ] Task: Write Tests: Navigation flows (auth gate, tab switching, deep linking)
- [ ] Task: Implement Feature: GitHub Actions CI workflow (lint, typecheck, test)
- [ ] Task: Implement Feature: Jest coverage thresholds (global >80%)
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Testing & CI/CD' (Protocol in workflow.md)

## Phase 4: Accessibility

- [ ] Task: Write Tests: Button, TextField, Modal accessibility (roles, labels, hints)
- [ ] Task: Implement Feature: Add a11y props to all UI components
- [ ] Task: Write Tests: Screen-level accessibility (headings, focus order)
- [ ] Task: Implement Feature: Add a11y to all screens (heading hierarchy, announcements)
- [ ] Task: Conductor - User Manual Verification 'Phase 4: Accessibility' (Protocol in workflow.md)

## Phase 5: Production Essentials

- [ ] Task: Implement Feature: Add .env.staging and .env.production with app.config.ts integration
- [ ] Task: Write Tests: Crash reporting service abstraction
- [ ] Task: Implement Feature: Sentry/crash reporting skeleton with Error Boundary integration
- [ ] Task: Write Tests: Analytics service abstraction (track, identify, reset)
- [ ] Task: Implement Feature: Analytics service with no-op default implementation
- [ ] Task: Write Tests: App update checker hook
- [ ] Task: Implement Feature: App version check / expo-updates integration
- [ ] Task: Conductor - User Manual Verification 'Phase 5: Production Essentials' (Protocol in workflow.md)

## Phase 6: Feature Completion

- [ ] Task: Write Tests: Onboarding flow (conditional rendering, mark as seen)
- [ ] Task: Implement Feature: Onboarding screens gated by useSettingsStore.onboardingSeen
- [ ] Task: Write Tests: Push notification registration and handling
- [ ] Task: Implement Feature: expo-notifications setup with permission + token registration
- [ ] Task: Write Tests: Biometric auth gate
- [ ] Task: Implement Feature: Biometric unlock using expo-local-authentication
- [ ] Task: Write Tests: Optimized image component
- [ ] Task: Implement Feature: expo-image integration for cached network images
- [ ] Task: Conductor - User Manual Verification 'Phase 6: Feature Completion' (Protocol in workflow.md)

## Phase 7: Developer Experience

- [ ] Task: Implement Feature: Populate src/constants with app-wide constants (storage keys, regex, config)
- [ ] Task: Implement Feature: Populate src/utils with common helpers (date, debounce, validators)
- [ ] Task: Write Tests: Utility functions (all helpers must have tests)
- [ ] Task: Implement Feature: Extend ShowcaseScreen with full UI component documentation
- [ ] Task: Implement Feature: Update README with architecture diagram, setup guide, contribution guide
- [ ] Task: Conductor - User Manual Verification 'Phase 7: Developer Experience' (Protocol in workflow.md)
