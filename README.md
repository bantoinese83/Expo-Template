# 🚀 Ultimate Expo Template (2026 Edition)

A battle-hardened, 100/100 quality foundation for building high-fidelity cross-platform apps. This template is designed for **maximum developer velocity**, absolute type safety, and production-grade resilience.

---

## ✨ Features

### 🏛️ Architecture & Routing

- **Expo Router (v6+)**: Type-safe, file-based routing with deep link and universal link support.
- **Modular shell**: Providers and RootGate are in `src/providers/`; app-wide bootstrap is in `src/bootstrap.ts`; logic is in `src/features/`.
- **Strict TypeScript**: 100% coverage with zero `any` types and strict validation.
- **Design System & Native Extensions**: Atomic UI Kit (`AppButton`, `AppInput`, `AppCard`) powered by **NativeWind v4** and **Reanimated 4**, extended with native **SwiftUI Glassmorphism** via a custom Expo Module (`premium-ui` GlassCard).

### 🛠️ Developer Velocity (New!)

- **Swagger-to-Hook (Orval)**: Automatically transform OpenAPI/Swagger specs into type-safe React Query hooks.
- **Settings UI Pack**: Pre-built, premium dashboard for settings and legal (Privacy/Terms) screens.
- **Standardized API Layer**: Centralized **Axios** client with automated interceptors for auth, logging, and error tracking.
- **Automated Feature Scaffolder**: Run `npm run generate:feature` to instantly scaffold standard feature subfolders with clean architectural boundaries.

### 🔐 Performance & Monitoring

- **Sentry-Ready**: Integrated monitoring via `ErrorTracking.ts` with auto-initialization in the root layout.
- **Offline Persistence**: **React Query** persistence with ultra-fast **MMKV v4** native storage, alongside **Drizzle SQLite** for local relational schemas.
- **Automated Quality**: **Husky** and **Lint-staged** pre-commit hooks ensure zero lint/type errors in your repo.

---

## 🛠️ Getting Started

### 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 2. Environment Setup

Create your `.env` file from the example. **Mock-only development** works with no Clerk or Supabase keys: leave those variables unset or empty. When you add a provider, set the keys for that provider; if you use Supabase, set **both** `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY`. In code, call `isClerkConfigured()` / `isSupabaseConfigured()` from `src/config/env.ts` before initializing those SDKs.

```bash
cp .env.example .env
```

Invalid values (for example a malformed URL) still fail validation. In production builds, bad configuration throws at startup so misconfiguration is not silent.

### 3. Database Initialization

The app uses a **single SQLite file** (`app.sqlite`, see `src/db/sqliteDatabase.ts`) for Drizzle migrations and for optional legacy storage helpers such as `src/utils/orderStorage.ts`, so schemas stay in one place. The Drizzle demo `orders` table was removed to avoid colliding with CRM-style `orders` from `orderStorage`.

```bash
npm run db:generate
```

```bash
npm run db:push
```

### 4. Start Development

```bash
npm start
```

For PRs and local conventions, see [CONTRIBUTING.md](./CONTRIBUTING.md). TanStack Query is wired to **network status** (`@react-native-community/netinfo`) and **app foreground** so queries pause offline and can **refetch on reconnect**; Axios reads the session token from `src/services/sessionToken.ts` (updated from `AuthProvider`).

---

## 🏗️ The Developer Workflow

### 📡 1. Generating API Hooks

Stop writing network boilerplate. Point the template to your Swagger spec and generate hooks in seconds.

1. Update `target` in `orval.config.ts`.
2. Run: `npm run generate:api`.
3. Use your new type-safe hooks: `import { useMyService } from "@/api/generated";`

### 🏗️ 2. Scaffolding Feature Modules

Maintain standard folder boundaries automatically. To create a new feature module (e.g. `billing`):

1. Run: `npm run generate:feature`
2. Follow prompt to enter feature name: `billing`
3. The script scaffolds complete clean-architecture directories (`components/`, `hooks/`, `services/`, `store/`) instantly.

### 💎 3. Premium Glassmorphic Cards (SwiftUI)

Your template ships with native Swift-UI glassmorphic widgets:

```typescript
import { GlassCard } from "premium-ui";

<GlassCard
  title="Native SwiftUI Card"
  content="System-level real-time blur materials adapt dynamically to Light and Dark modes with automatic contrast adjustment."
/>
```

---

## 📖 Key Scripts

| Command                    | Description                                             |
| :------------------------- | :------------------------------------------------------ |
| `npm run check-all`        | Run Lint, Type-check, Format, and Jest (Goal: 100/100). |
| `npm run generate:api`     | Generate React Query hooks from Swagger/OpenAPI.        |
| `npm run generate:feature` | Scaffold a standard, clean-architecture feature.        |
| `npm run db:generate`      | Generate SQL migrations from Drizzle schema.            |
| `npm run db:push`          | Apply migrations to your local SQLite DB.               |
| `npm run deploy`           | Trigger a production build via EAS.                     |

## 📁 Directory Overview

- `app/`: Routing and layouts.
  - `(auth)/`: Login, Signup, Forgot Password.
  - `(tabs)/`: Main app navigation.
  - `settings/`: Pre-built settings/legal pack.
- `modules/`: Custom Expo Native Modules (e.g., `premium-ui` containing SwiftUI code).
- `scripts/`: Custom tooling scripts (e.g., `generate-feature.js`).
- `src/api/`: Centralized Axios client and interceptors.
- `src/components/ui/`: Atomic UI kit (high-fidelity primitives).
- `src/db/`: SQLite schema and Drizzle client.
- `src/services/`: Monitoring, Storage (MMKV), Deep Linking, and Auth services.

---

Built by Monarch Labs Collective Inc. for the Expo developer community.
🏆 **100/100 Production Ready.**
