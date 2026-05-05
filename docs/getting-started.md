# Building your app from this template

Use this checklist once after cloning. The goal is to replace template branding and IDs in a few minutes, then focus on product features.

## 1. Prerequisites

- **Node.js** — Use the version in [`.nvmrc`](../.nvmrc) (e.g. `nvm use`).
- **iOS / Android toolchains** — Only required when you run `expo run:ios`, `expo run:android`, or EAS builds.

## 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

## 3. Rename the app (one command)

Sets display name, Expo slug, URL scheme, npm package name, iOS bundle ID, Android `applicationId`, and `EXPO_PUBLIC_APP_SCHEME` in `.env.example`.

```bash
npm run init-app -- --name "Acme CRM" --slug acme-crm --bundle com.acme.crm
```

Optional:

- **`--scheme acmecrm`** — Deep link scheme (default: slug with non-letters removed, e.g. `acmecrm`).
- **`--domain app.acme.com`** — Universal / App Links host in `app.json` (replaces `your-domain.com` placeholders).
- **`--dry-run`** — Preview changes without writing files.

Then copy env and start Metro:

```bash
cp .env.example .env
npm install --legacy-peer-deps
npm start
```

**Mock auth** works with no Clerk/Supabase keys. Default demo login uses `dev@example.com` / `password` on the login screen when those fields are left as-is.

## 4. Local database (Drizzle + SQLite)

When you change `src/db/schema.ts`:

```bash
npm run db:generate
npm run db:push
```

## 5. Point the app at your API

1. Set `EXPO_PUBLIC_API_URL` in `.env` (see [`src/config/env.ts`](../src/config/env.ts)).
2. Put your OpenAPI URL or file in `orval.config.ts`, then run `npm run generate:api`.
3. Use generated hooks from `@/api/generated` and the shared Axios client in `src/api/client.ts`.

## 6. Add a vertical feature

```bash
npm run generate:feature -- invoices
```

Creates `src/features/invoices/` with `components`, `hooks`, `api`, `types`, `services`.

## 7. Ship builds (EAS)

1. Create/link an Expo project: `eas login`, `eas init` (or connect the repo in the Expo dashboard).
2. Confirm `ios.bundleIdentifier` and `android.package` in `app.json` match your Apple / Google app IDs.
3. `npm run deploy` (or `eas build`) using profiles in [`eas.json`](../eas.json).

## 8. Optional cleanup

- Replace **assets** under `assets/` (icon, splash, adaptive icons).
- Remove or adapt **demo screens** under `app/(tabs)/` and mock data (e.g. orders list).
- Configure **Sentry**, **PostHog**, **Clerk**, or **Supabase** via `.env` when you are ready (see `.env.example`).

## Where things live

| Concern            | Location                                                                        |
| ------------------ | ------------------------------------------------------------------------------- |
| Routes / layouts   | `app/`                                                                          |
| Feature modules    | `src/features/*`                                                                |
| UI kit             | `src/components/ui/`                                                            |
| Env validation     | `src/config/env.ts`                                                             |
| Query + offline    | `src/query/`                                                                    |
| SQLite + Drizzle   | `src/db/`                                                                       |
| Navigation rules   | `src/features/navigation/`                                                      |
| Architecture notes | [`docs/adr/0001-architecture-overview.md`](./adr/0001-architecture-overview.md) |

## 9. Common `expo run:ios` messages (usually harmless)

| Message                                                      | Meaning                                                                                                                                                         |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Invalid updates configuration / runtime version**          | Fixed in-repo via `runtimeVersion` in [`app.config.ts`](../app.config.ts). Re-run `npx expo prebuild` if native folders were generated before this change.      |
| **Sentry — Missing config for organization, project**        | Set `SENTRY_ORG` and `SENTRY_PROJECT` in `.env` (see `.env.example`). [`app.config.ts`](../app.config.ts) passes them into the Sentry Expo plugin when present. |
| **Pods/… iOS deployment version mismatch**                   | CocoaPods comparing a pod’s minimum iOS to the project—typically safe to ignore unless you see a real compile error.                                            |
| **SafeAreaView has been deprecated**                         | Your screens already use `react-native-safe-area-context`; the warning usually comes from a dependency until they update.                                       |
| **Xcode “ambiguous dependencies” / script runs every build** | Known noise from some Expo / Sentry build phases; optional cleanup in Xcode **Build Phases** if it bothers you.                                                 |

For PR conventions, see [CONTRIBUTING.md](../CONTRIBUTING.md).
