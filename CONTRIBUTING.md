# Contributing

## Prerequisites

- Node.js 20 (see `.nvmrc`)
- Xcode / Android Studio when testing native builds

## First-time setup

Use the Node version in `.nvmrc` (`nvm use`). After cloning:

```bash
npm install --legacy-peer-deps
npm run init-app -- --name "My App" --slug my-app --bundle com.example.myapp
cp .env.example .env
```

See [docs/getting-started.md](./docs/getting-started.md) for the full checklist (API, Drizzle, EAS).

## Scripts (run before opening a PR)

```bash
npm run check-all
```

This runs ESLint, TypeScript (`tsc`), Prettier, and Jest.

## Architecture

- **Shell composition** — `bootstrapAppShell` is in `src/bootstrap.ts`; `AppProviders` and `RootGate` are in `src/providers/`.
- **`src/features/*`** — Vertical slices with focused hooks and types (`auth`, `navigation`, `database`, `linking`). Prefer adding behavior here instead of growing `app/_layout.tsx`.
- **`src/query/`** — TanStack Query factory (`createAppQueryClient`), persistence helper, and NetInfo / focus wiring.
- **`src/components/`**, **`src/services/`**, **`src/db/`** — Shared UI, integrations, and local data.

Pure routing rules live in `src/features/navigation/authRedirect.ts` with unit tests alongside.

## Imports

Prefer the `@/` alias for anything under `src/` (for example `@/components/AppHeader` instead of long `../../` paths). `tsconfig.json` and `babel.config.js` are configured for Metro and tests.

`babel-plugin-module-resolver` and `babel-plugin-inline-import` are listed under **dependencies** (not only devDependencies) so Metro’s Babel worker can always resolve them when bundling.

## Database

Drizzle migrations run on launch. After changing `src/db/schema.ts`:

```bash
npm run db:generate
```

## Environment

See `README.md` and `src/config/env.ts`. Mock-only development is supported without Clerk or Supabase keys.
