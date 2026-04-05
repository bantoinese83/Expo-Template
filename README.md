# 🚀 Ultimate Expo Template (2026 Edition)

A professional, production-ready foundation for building high-fidelity cross-platform apps with Expo and React Native. Designed for 100% type safety, local-first performance, and rapid developer velocity.

## ✨ Features

### 🏛️ Architecture & Routing

- **Expo Router (v6+)**: File-based routing with tab management and route protection.
- **Strict TypeScript**: 100% type coverage with strict-mode enabled.
- **Design System**: Atomic UI primitives (`AppButton`, `AppInput`, `AppModal`) powered by **NativeWind v4**.

### 🔐 Authentication (Agnostic)

- **Universal Provider**: Seamlessly switch between **Clerk**, **Supabase**, or **Mock** authentication.
- **Route Protection**: Automated redirection for unauthenticated users.

### 💾 Data & State

- **Local-First**: High-speed offline persistence using **Expo SQLite** + **Drizzle ORM**.
- **Server State**: Efficient caching and synchronization with **TanStack Query (v5)**.
- **Client State**: Lightweight, persistent store powered by **Zustand**.

### 🛠️ Tooling & Quality

- **Automated Testing**: Integrated **Jest** setup for unit and component testing.
- **CI/CD**: GitHub Actions for automated linting, type-checking, and formatting.
- **Error Tracking**: Global `ErrorBoundary` with recovery support via `expo-updates`.

---

## 🛠️ Getting Started

### 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 2. Environment Setup

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

### 3. Local Database

Initialize your local SQLite schema:

```bash
npm run db:generate
npm run db:push
```

### 4. Start Development

```bash
npm run ios # or npm run android
```

---

## 📖 Key Directories

- `app/`: Routing and layouts (Expo Router). Use `(auth)` for login flow and `(tabs)` for the main app.
- `src/components/ui/`: Atomic UI kit. High-fidelity, haptic-enabled primitives.
- `src/db/`: SQLite schema (`schema.ts`) and Drizzle client.
- `src/hooks/`: Custom hooks (Auth, Theme, etc.).
- `src/providers/`: Global context providers.
- `src/store/`: Zustand persistent state.

---

## 🏗️ Architecture Best Practices

### Adding a New Screen

1. Create a new file in `app/`.
2. Wrap your content in a `View` with `flex-1`.
3. Use `AppText` and `AppButton` from the UI kit for consistency.

### Updating Database Schema

1. Modify `src/db/schema.ts`.
2. Run `npm run db:generate` to create a migration.
3. Run `npm run db:push` to apply changes to your local DB.

### Handling API Calls

1. Define a service function in `src/services/`.
2. Use `useQuery` or `useMutation` from `@tanstack/react-query` in your components.

---

## 🚀 Quality & Deployment

### Run All Checks

Before pushing, ensure all checks pass:

```bash
npm run check-all
```

### Deployment Strategy

- **Preview**: `eas build --profile preview` (Internal testing).
- **Production**: `eas build --profile production` (App Store / Play Store).

---

Made with ❤️ for the Expo developer community.
