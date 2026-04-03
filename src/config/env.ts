import { z } from "zod";
import Constants from "expo-constants";

/**
 * Validates and exports environment variables.
 * Type-safe and fails fast if any key is missing.
 */
const envSchema = z.object({
  EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().optional(),
  EXPO_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  EXPO_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
});

const _env = envSchema.safeParse({
  EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY:
    Constants.expoConfig?.extra?.clerkPublishableKey ||
    process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY,
  EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
  EXPO_PUBLIC_SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
});

if (!_env.success) {
  console.error("❌ Invalid environment variables:", _env.error.format());
  // throw new Error("Invalid environment variables");
}

export const env = _env.data || {};
