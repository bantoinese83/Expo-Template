import React from "react";
import { View } from "react-native";
import { Stack, useRouter, useSegments } from "expo-router";

import { MigrationErrorView } from "@/components/MigrationErrorView";
import { DebugLogViewer } from "@/components/security/DebugLogViewer";
import { PrivacyOverlay } from "@/components/security/PrivacyOverlay";
import { OfflineBanner } from "@/components/ui/OfflineBanner";
import { useAuth } from "@/features/auth";
import { useDatabaseMigrations } from "@/features/database";
import { useAppDeepLinks } from "@/features/linking";
import { useAuthRouteSync } from "@/features/navigation";
import { useCheckUpdates } from "@/features/updates/useCheckUpdates";
import { useDebugStore } from "@/store/useDebugStore";
import { colors } from "@/theme/tokens";

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

  const isBootstrapping = isAuthLoading || !isDbReady;

  if (isBootstrapping) {
    return <View style={{ flex: 1, backgroundColor: colors.shell.bootstrap }} />;
  }

  if (migrationError) {
    return <MigrationErrorView message={migrationError} onRetry={retryMigrations} />;
  }

  return <NavigationContent isAuthenticated={isAuthenticated} />;
}

function NavigationContent({ isAuthenticated }: { isAuthenticated: boolean }) {
  const { isViewerVisible, hideViewer } = useDebugStore();

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      <AuthRouteGuard isAuthenticated={isAuthenticated} />
      <OfflineBanner />
      <PrivacyOverlay />
      <DebugLogViewer isVisible={isViewerVisible} onClose={hideViewer} />
    </>
  );
}

/**
 * Isolated component to consume navigation hooks safely within the router context.
 */
function AuthRouteGuard({ isAuthenticated }: { isAuthenticated: boolean }) {
  const segments = useSegments();
  const router = useRouter();

  useAuthRouteSync({
    isAuthenticated,
    isBootstrapping: false,
    migrationError: null,
    segments,
    router,
  });

  useAppDeepLinks({
    enabled: true,
  });

  useCheckUpdates();

  return null;
}
