import { useState, useCallback } from "react";
import { AuthProviderId, AuthUser, SignInCredentials } from "../auth.types";
import { logger } from "@/utils/logger";

/**
 * Encapsulates mock authentication logic for the template.
 * Easily replaceable with real provider logic (Firebase, Supabase, Clerk).
 */
export function useMockAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signIn = useCallback(
    async (provider: AuthProviderId = "mock", credentials?: SignInCredentials) => {
      setIsLoading(true);
      setError(null);
      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (provider === "mock") {
          const email = credentials?.email?.trim() || "dev@example.com";
          const name = email.split("@")[0] || "Developer";
          setUser({ id: "1", email, name });
          logger.info("Mock sign-in successful", { email });
        } else {
          throw new Error(`${provider} integration is coming soon.`);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Sign-in failed";
        setError(msg);
        logger.error("Sign-in error", err);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const signUp = useCallback(async (email: string, _pass: string, name?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const displayName = name?.trim() || email.split("@")[0] || "Member";
      setUser({ id: "2", email, name: displayName });
      logger.info("Mock sign-up successful", { email });
    } catch (_err) {
      setError("Sign-up failed");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setUser(null);
      logger.info("Sign-out successful");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { user, isLoading, error, signIn, signUp, signOut, setError };
}
