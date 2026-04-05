import { z } from "zod";
import Constants from "expo-constants";

/**
 * Validates and exports environment variables.
 * Type-safe and fails fast if any key is missing.
 */
const envSchema = z.object({
  EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1, "Clerk Publishable Key is required"),
  EXPO_PUBLIC_SUPABASE_URL: z.string().url("Valid Supabase URL is required"),
  EXPO_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1, "Supabase Anon Key is required"),
  EXPO_PUBLIC_SENTRY_DSN: z.string().optional(), // Sentry is optional but recommended
});

const _env = envSchema.safeParse({
  EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY:
    Constants.expoConfig?.extra?.clerkPublishableKey ||
    process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
  EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
  EXPO_PUBLIC_SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  EXPO_PUBLIC_SENTRY_DSN: process.env.EXPO_PUBLIC_SENTRY_DSN,
});

if (!_env.success) {
  console.error("❌ Invalid environment variables:", _env.error.format());
  if (!__DEV__) {
    throw new Error("Invalid environment variables. Please check your .env file.");
  }
}

export const env = _env.data || ({} as z.infer<typeof envSchema>);
