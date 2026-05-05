import appJson from "./app.json";

type PluginEntry =
  | string
  | [string, Record<string, unknown>]
  | readonly [string, Record<string, unknown>];

/**
 * Dynamic Expo config layered on static `app.json` so we can:
 * - Set a proper `runtimeVersion` for expo-updates (avoids native "Invalid updates configuration" in dev/simulator).
 * - Pass Sentry org/project into the Expo config plugin when `SENTRY_ORG` / `SENTRY_PROJECT` are set
 *   (quiets "@sentry/react-native/expo — Missing config for organization, project" during native builds).
 *
 * Expo reads `app.config.*` as the source of truth; `app.json` remains the editable baseline imported here.
 */
function withSentryPlugin(plugins: readonly PluginEntry[] | undefined): PluginEntry[] {
  const org = process.env.SENTRY_ORG;
  const project = process.env.SENTRY_PROJECT;

  return (plugins ?? []).map((entry) => {
    if (entry === "@sentry/react-native") {
      if (org && project) {
        return ["@sentry/react-native/expo", { organization: org, project }] as const;
      }
      return "@sentry/react-native/expo";
    }
    return entry;
  });
}

export default {
  expo: {
    ...appJson.expo,
    runtimeVersion: {
      policy: "appVersion",
    },
    plugins: withSentryPlugin(appJson.expo.plugins as readonly PluginEntry[]),
  },
};
