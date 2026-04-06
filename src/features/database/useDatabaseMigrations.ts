import { useCallback, useEffect, useState } from "react";

import { runMigrations } from "@/db/migrations";
import { errorTracking } from "@/services/ErrorTracking";

export const MIGRATION_ERROR_USER_MESSAGE =
  "We could not update the local database. Your data on this device may be unavailable until this is fixed.";

export type MigrationRunner = () => Promise<void>;

export type UseDatabaseMigrationsOptions = {
  /** Inject for tests; defaults to Drizzle `runMigrations`. */
  run?: MigrationRunner;
};

export type DatabaseMigrationsState = {
  isReady: boolean;
  errorMessage: string | null;
  retry: () => void;
};

/**
 * Runs SQLite migrations once per mount (or after `retry`). DB-ready flag is independent of success
 * so the UI can show an error screen instead of hanging on splash.
 */
export function useDatabaseMigrations(
  options?: UseDatabaseMigrationsOptions
): DatabaseMigrationsState {
  const run = options?.run ?? runMigrations;
  const [isReady, setIsReady] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setErrorMessage(null);
    setIsReady(false);

    void (async () => {
      try {
        await run();
        if (!cancelled) setErrorMessage(null);
      } catch (e) {
        console.error("Migration error:", e);
        errorTracking.captureException(e, { context: "migrations" });
        if (!cancelled) setErrorMessage(MIGRATION_ERROR_USER_MESSAGE);
      } finally {
        if (!cancelled) setIsReady(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [attempt, run]);

  const retry = useCallback(() => {
    setAttempt((n) => n + 1);
  }, []);

  return { isReady, errorMessage, retry };
}
