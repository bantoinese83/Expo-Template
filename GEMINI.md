# Project Mandates: 2026 Expo Template

This file codifies the foundational architectural rules and development standards for this project. All contributors (human or AI) MUST adhere to these mandates to maintain a 100/100 project health score.

## 🏛 Architecture & Structure

- **Feature-First Pattern:** Core logic belongs in `src/features/{feature-name}/`. Each feature should contain its own `components/`, `hooks/`, `api/`, and `services/`.
- **Atomic UI Kit:** Low-level, reusable primitives (Button, Text, Input, Card) MUST reside in `src/components/ui/` and be exported from `src/components/ui/index.ts`.
- **Centralized Services:** Cross-cutting concerns (Auth, Error Tracking, Notifications) must reside in `src/services/` or `src/features/` with a clean public API.
- **SQLite Single-Source:** All local data storage must go through the Drizzle SQLite client (`src/db/`). Do not use AsyncStorage directly for structured data.

## 🚀 Performance Standards

- **Memoization:** Wrap all atomic UI components in `React.memo` to prevent leaf-node re-renders. Always wrap global context provider values in `useMemo`.
- **Image Optimization:** NEVER use the standard `react-native` Image component. ALWAYS use `expo-image` for high-performance caching and smooth transitions.
- **Network Resilience:** Use the provided `useIsOnline` hook and `OfflineBanner` to handle connectivity transitions gracefully.

## 🎨 UI & Styling

- **Design System:** Use the design tokens in `src/theme/tokens.ts` for all styling.
- **NativeWind v4:** All styling must be performed using Tailwind CSS classes via NativeWind. Avoid inline styles or standard StyleSheet unless absolutely necessary for complex animations.
- **Haptics:** Provide tactile feedback using `expo-haptics` for all primary user actions (toggles, buttons, selections).

## 🛠 Developer Workflow

- **Type Safety:** 100% strict TypeScript. Avoid `any` at all costs. Use Zod for runtime validation.
- **Scaffolding:** Use `npm run generate:feature <name>` to start new modules.
- **Database:** Use `npm run db:studio` for visual inspection of the local database.
- **Verification:** Always run `npm run check-all` before submitting any changes.
