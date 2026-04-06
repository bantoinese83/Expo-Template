# Contributing

## Prerequisites

- Node.js 20 (see `.nvmrc`)
- Xcode / Android Studio when testing native builds

## First-time setup

```bash
npm install --legacy-peer-deps
cp .env.example .env
```

## Scripts (run before opening a PR)

```bash
npm run check-all
```

This runs ESLint, TypeScript (`tsc`), Prettier, and Jest.

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
