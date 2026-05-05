import { z } from "zod";
import Constants from "expo-constants";

/**
 * Environment variables for public (client-safe) configuration.
 * Clerk and Supabase are optional so mock-only development works without credentials.
 * Use `isClerkConfigured()` / `isSupabaseConfigured()` before calling those SDKs.
 */
const emptyToUndefined = (val: unknown) =>
  typeof val === "string" && val.trim() === "" ? undefined : val;

const optionalNonEmpty = z.preprocess(emptyToUndefined, z.string().min(1).optional());

const optionalUrl = z.preprocess(emptyToUndefined, z.string().url().optional());

const optionalApiUrl = z.preprocess(emptyToUndefined, z.string().url().optional());

const envSchema = z
  .object({
    EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY: optionalNonEmpty,
    EXPO_PUBLIC_SUPABASE_URL: optionalUrl,
    EXPO_PUBLIC_SUPABASE_ANON_KEY: optionalNonEmpty,
    EXPO_PUBLIC_SENTRY_DSN: z.preprocess(emptyToUndefined, z.string().optional()),
    EXPO_PUBLIC_API_URL: optionalApiUrl,
    EXPO_PUBLIC_POSTHOG_API_KEY: optionalNonEmpty,
    EXPO_PUBLIC_POSTHOG_HOST: optionalUrl,
  })
  .superRefine((data, ctx) => {
    const hasUrl = Boolean(data.EXPO_PUBLIC_SUPABASE_URL);
    const hasKey = Boolean(data.EXPO_PUBLIC_SUPABASE_ANON_KEY);
    if (hasUrl !== hasKey) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Use both EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY, or omit both for mock-only mode.",
        path: hasUrl ? ["EXPO_PUBLIC_SUPABASE_ANON_KEY"] : ["EXPO_PUBLIC_SUPABASE_URL"],
      });
    }
  });

const _env = envSchema.safeParse({
  EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY:
    Constants.expoConfig?.extra?.clerkPublishableKey ||
    process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
  EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
  EXPO_PUBLIC_SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  EXPO_PUBLIC_SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN,
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
  EXPO_PUBLIC_POSTHOG_API_KEY: process.env.EXPO_PUBLIC_POSTHOG_API_KEY,
  EXPO_PUBLIC_POSTHOG_HOST: process.env.EXPO_PUBLIC_POSTHOG_HOST,
});

if (!_env.success) {
  console.error("Invalid environment variables:", _env.error.format());
  if (!__DEV__) {
    throw new Error(
      "Invalid environment variables. Fix your production env or remove invalid entries."
    );
  }
}

export type AppEnv = z.infer<typeof envSchema>;

export const env: AppEnv = _env.success
  ? _env.data
  : ({
      EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY: undefined,
      EXPO_PUBLIC_SUPABASE_URL: undefined,
      EXPO_PUBLIC_SUPABASE_ANON_KEY: undefined,
      EXPO_PUBLIC_SENTRY_DSN: undefined,
      EXPO_PUBLIC_API_URL: undefined,
      EXPO_PUBLIC_POSTHOG_API_KEY: undefined,
      EXPO_PUBLIC_POSTHOG_HOST: undefined,
    } satisfies AppEnv);

export function isClerkConfigured(): boolean {
  return Boolean(env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY);
}

export function isSupabaseConfigured(): boolean {
  return Boolean(env.EXPO_PUBLIC_SUPABASE_URL && env.EXPO_PUBLIC_SUPABASE_ANON_KEY);
}
