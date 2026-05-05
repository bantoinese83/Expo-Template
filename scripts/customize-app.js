#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
/**
 * Rename this template into your app: Expo name/slug/scheme, npm package name, iOS bundle ID,
 * Android application id, optional universal-link host, and .env scheme line.
 *
 * Usage:
 *   npm run init-app -- --name "My Product" --slug my-product --bundle com.company.myproduct
 *   npm run init-app -- --name "My Product" --slug my-product --bundle com.company.myproduct --domain app.example.com
 *   npm run init-app -- --dry-run ...   # print planned changes only
 *
 * After running: copy .env, run `npm install` once (refreshes lockfile name), replace store assets under `assets/`.
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");

function parseArgs(argv) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      out.help = true;
      continue;
    }
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith("-")) {
        out[key] = next;
        i++;
      } else {
        out[key] = true;
      }
    } else {
      out._.push(arg);
    }
  }
  return out;
}

function die(msg) {
  console.error(msg);
  process.exit(1);
}

const npmNameRe = /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9]([a-z0-9._-]*[a-z0-9])?$/;
const bundleRe = /^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/i;

function defaultSchemeFromSlug(slug) {
  const s = slug.replace(/[^a-z0-9]/gi, "").toLowerCase();
  return s.length >= 2
    ? s
    : die("❌ Could not derive --scheme from --slug; pass --scheme explicitly.");
}

function patchEnvExample(scheme, dryRun) {
  const envPath = path.join(ROOT, ".env.example");
  let text = fs.readFileSync(envPath, "utf8");
  const lineRe = /^EXPO_PUBLIC_APP_SCHEME=.*$/m;
  if (!lineRe.test(text)) {
    die("❌ .env.example: missing EXPO_PUBLIC_APP_SCHEME line.");
  }
  const next = text.replace(lineRe, `EXPO_PUBLIC_APP_SCHEME=${scheme}`);
  if (dryRun) {
    console.log("📝 .env.example → EXPO_PUBLIC_APP_SCHEME=%s", scheme);
    return;
  }
  fs.writeFileSync(envPath, next, "utf8");
  console.log("✅ Updated .env.example");
}

function patchPackageJson(npmName, dryRun) {
  const pkgPath = path.join(ROOT, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  const prev = pkg.name;
  pkg.name = npmName;
  if (dryRun) {
    console.log("📝 package.json name: %s → %s", prev, npmName);
    return;
  }
  fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, "utf8");
  console.log("✅ Updated package.json name");
}

function patchAppJson({ displayName, slug, scheme, bundle, domain }, dryRun) {
  const appPath = path.join(ROOT, "app.json");
  const data = JSON.parse(fs.readFileSync(appPath, "utf8"));
  const expo = data.expo;
  if (!expo) die("❌ app.json: missing expo key");

  const before = {
    name: expo.name,
    slug: expo.slug,
    scheme: expo.scheme,
    bundle: expo.ios?.bundleIdentifier,
    package: expo.android?.package,
  };

  expo.name = displayName;
  expo.slug = slug;
  expo.scheme = scheme;
  if (expo.ios) expo.ios.bundleIdentifier = bundle;
  if (expo.android) expo.android.package = bundle;

  if (domain) {
    if (expo.ios?.associatedDomains) {
      expo.ios.associatedDomains = [`applinks:${domain}`];
    }
    if (expo.android?.intentFilters?.[0]?.data?.[0]) {
      expo.android.intentFilters[0].data[0].host = domain;
    }
  }

  if (dryRun) {
    console.log("📝 app.json expo:", {
      before,
      after: {
        name: expo.name,
        slug: expo.slug,
        scheme: expo.scheme,
        bundle,
        domain: domain || "(unchanged)",
      },
    });
    return;
  }
  fs.writeFileSync(appPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log("✅ Updated app.json");
}

function printHelp() {
  console.log(`
Rename the template for your product (display name, IDs, deep linking).

Required flags:
  --name "My App"          App name shown on the device (expo.name)
  --slug my-app            Expo / EAS project slug (lowercase, hyphens ok)
  --bundle com.you.app     iOS bundle ID + Android applicationId (same value)

Optional:
  --scheme myapp           URL scheme for linking (default: slug without non-alphanumerics, min 2 chars)
  --domain links.example.com   Sets iOS associatedDomains + Android intent filter host
  --dry-run                Print changes only

Then: cp .env.example .env && npm install && npm start
`);
}

const args = parseArgs(process.argv.slice(2));

if (args.help) {
  printHelp();
  process.exit(0);
}

const displayName = args.name;
const slug = args.slug;
const bundle = args.bundle;
const domain = args.domain || "";
const dryRun = Boolean(args["dry-run"]);
let scheme = args.scheme;

if (!displayName || !slug || !bundle) {
  printHelp();
  die("\n❌ Pass --name, --slug, and --bundle.");
}

if (!npmNameRe.test(slug)) {
  die(`❌ --slug must be a valid npm/unscoped package name (got "${slug}").`);
}
if (!bundleRe.test(bundle)) {
  die(`❌ --bundle should look like com.company.app (got "${bundle}").`);
}

if (!scheme) {
  scheme = defaultSchemeFromSlug(slug);
}

if (scheme.length < 2) {
  die("❌ --scheme must be at least 2 characters.");
}

console.log(dryRun ? "🔍 Dry run (no files written)\n" : "🚀 Customizing template…\n");
console.log({
  displayName,
  slug,
  scheme,
  bundle,
  domain: domain || "(not set)",
});

patchPackageJson(slug, dryRun);
patchAppJson({ displayName, slug, scheme, bundle, domain }, dryRun);
patchEnvExample(scheme, dryRun);

if (!dryRun) {
  console.log(`
✨ Done.

Next steps:
  1. cp .env.example .env
  2. npm install          # refreshes package-lock name for "${slug}"
  3. Replace icons/splash under assets/ if needed
  4. npm start

See docs/getting-started.md for backend, EAS, and release checklists.
`);
}
