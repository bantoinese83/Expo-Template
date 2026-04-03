# 🚀 Ultimate Expo Template (2026 Edition)

A professional, production-ready foundation for building high-fidelity cross-platform apps with Expo and React Native. Designed for 100% type safety, local-first performance, and rapid developer velocity.

## ✨ Features

### 🏛️ Architecture & Routing
- **Expo Router (v6+)**: File-based routing with tab management and route protection.
- **Strict TypeScript**: 100% type coverage with strict-mode enabled.
- **Design System**: Atomic UI primitives (`AppText`, `AppCard`) powered by **NativeWind v4**.

### 🔐 Authentication (Agnostic)
- **Universal Provider**: Seamlessly switch between **Clerk**, **Supabase**, or **Mock** authentication.
- **Route Protection**: Automated redirection for unauthenticated users.

### 💾 Data & State
- **Local-First**: High-speed offline persistence using **Expo SQLite** + **Drizzle ORM**.
- **Server State**: Efficient caching and synchronization with **TanStack Query (v5)**.
- **Client State**: Lightweight, persistent store powered by **Zustand**.

### 🌍 Production Extras
- **Forms & Validation**: Built with `react-hook-form` + `Zod`.
- **i18n**: Multi-language support with `i18next`.
- **EAS Optimized**: Standardized `eas.json` profiles for development, preview, and production.
- **Safe Env**: Strictly typed environment variable validation.

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create a `.env` file based on your provider:
```bash
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
EXPO_PUBLIC_SUPABASE_URL=https://...
EXPO_PUBLIC_SUPABASE_ANON_KEY=...
```

### 3. Local Database
Initialize your local SQLite schema:
```bash
npm run db:generate
npm run db:push
```

---

## 📖 Key Directories

- `app/`: Routing and layouts (Expo Router).
- `src/components/`: UI library and business-level components.
- `src/db/`: SQLite schema and client configuration.
- `src/hooks/`: Custom hooks for state and domain logic.
- `src/providers/`: Context providers (Auth, Theme).
- `src/schemas/`: Zod validation schemas.

---

## 🎨 UI & Design system

We use **NativeWind v4**. You can use Tailwind classes directly on your components:
```tsx
<View className="flex-1 bg-white items-center justify-center">
  <AppText variant="h1" className="text-indigo-600">
    Hello World
  </AppText>
</View>
```

---

## 🚀 Deployment

Generate a build for internal testing:
```bash
eas build --profile preview --platform ios
```

---

Made with ❤️ for the Expo developer community.
