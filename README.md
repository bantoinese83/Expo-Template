# 🚀 Ultimate Expo Template (2026 Edition)

A battle-hardened, 100/100 quality foundation for building high-fidelity cross-platform apps. This template is designed for **maximum developer velocity**, absolute type safety, and production-grade resilience.

---

## ✨ Features

### 🏛️ Architecture & Routing

- **Expo Router (v6+)**: Type-safe, file-based routing with deep link and universal link support.
- **Strict TypeScript**: 100% coverage with zero `any` types and strict validation.
- **Design System**: Atomic UI Kit (`AppButton`, `AppInput`, `AppCard`) powered by **NativeWind v4** and **Reanimated 4**.

### 🛠️ Developer Velocity (New!)

- **Swagger-to-Hook (Orval)**: Automatically transform OpenAPI/Swagger specs into type-safe React Query hooks.
- **Settings UI Pack**: Pre-built, premium dashboard for settings and legal (Privacy/Terms) screens.
- **Standardized API Layer**: Centralized **Axios** client with automated interceptors for auth, logging, and error tracking.

### 🔐 Performance & Monitoring

- **Sentry-Ready**: Integrated monitoring via `ErrorTracking.ts` with auto-initialization in the root layout.
- **Offline Persistence**: **React Query** persistence with `AsyncStorage` and **Drizzle SQLite** for local-first data.
- **Automated Quality**: **Husky** and **Lint-staged** pre-commit hooks ensure zero lint/type errors in your repo.

---

## 🛠️ Getting Started

### 1. Install Dependencies

```bash
npm install --legacy-peer-deps
```

### 2. Environment Setup

Create your `.env` file. **Important**: The app uses strict Zod validation and will fail-fast on boot if required keys are missing.

```bash
cp .env.example .env
```

### 3. Database Initialization

```bash
npm run db:generate
npm run db:push
```

### 4. Start Development

```bash
npm start
```

---

## 🏗️ The Developer Workflow

### 📡 1. Generating API Hooks

Stop writing network boilerplate. Point the template to your Swagger spec and generate hooks in seconds.

1. Update `target` in `orval.config.ts`.
2. Run: `npm run generate:api`.
3. Use your new type-safe hooks: `import { useMyService } from "@/api/generated";`

### ⚙️ 2. Rapid UI Pack

Your app comes with a pre-built [Settings Dashboard](file:///Users/monarchlabsinc./Desktop/Work/Projects/2026_expo_templete/app/settings/index.tsx).

- **Settings**: Use `(settings)` to add account/preference toggles.
- **Legal**: Just add your text to `app/settings/legal.tsx` to get beautiful Privacy Policy and TOS screens.

### 🚨 3. Monitoring & Errors

Use the `errorTracking` service globally to capture exceptions:

```typescript
import { errorTracking } from "@/services/ErrorTracking";
errorTracking.captureException(error, { category: "payment_flow" });
```

---

## 📖 Key Scripts

| Command                | Description                                             |
| :--------------------- | :------------------------------------------------------ |
| `npm run check-all`    | Run Lint, Type-check, Format, and Jest (Goal: 100/100). |
| `npm run generate:api` | Generate React Query hooks from Swagger/OpenAPI.        |
| `npm run db:generate`  | Generate SQL migrations from Drizzle schema.            |
| `npm run db:push`      | Apply migrations to your local SQLite DB.               |
| `npm run deploy`       | Trigger a production build via EAS.                     |

## 📁 Directory Overview

- `app/`: Routing and layouts.
  - `(auth)/`: Login, Signup, Forgot Password.
  - `(tabs)/`: Main app navigation.
  - `settings/`: Pre-built settings/legal pack.
- `src/api/`: Centralized Axios client and interceptors.
- `src/components/ui/`: Atomic UI kit (high-fidelity primitives).
- `src/db/`: SQLite schema and Drizzle client.
- `src/services/`: Monitoring, Deep Linking, and Auth services.

---

Built by Monarch Labs Collective Inc. for the Expo developer community.
🏆 **100/100 Production Ready.**
