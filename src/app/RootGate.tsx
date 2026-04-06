import React from "react";
import { Stack, useRouter, useSegments } from "expo-router";

import { MigrationErrorView } from "@/components/MigrationErrorView";
import { SplashView } from "@/components/SplashView";
import { useAuth } from "@/features/auth";
import { useDatabaseMigrations } from "@/features/database";
import { useAppDeepLinks } from "@/features/linking";
import { useAuthRouteSync } from "@/features/navigation";

/**
 * Auth + DB gate and root stack. Keeps `app/_layout.tsx` as a thin entry file.
 */
export function RootGate() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const {
    isReady: isDbReady,
    errorMessage: migrationError,
    retry: retryMigrations,
  } = useDatabaseMigrations();
  const segments = useSegments();
  const router = useRouter();

  const isBootstrapping = isAuthLoading || !isDbReady;

  useAuthRouteSync({
    isAuthenticated,
    isBootstrapping,
    migrationError,
    segments,
    router,
  });

  useAppDeepLinks({
    enabled: !isBootstrapping && !migrationError,
  });

  if (isBootstrapping) {
    return <SplashView />;
  }

  if (migrationError) {
    return <MigrationErrorView message={migrationError} onRetry={retryMigrations} />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
