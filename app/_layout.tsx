import "../global.css";
import "@/i18n";
import { ensureReactQueryNative } from "@/query/reactQueryNative";
import React, { useCallback, useEffect, useState } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AuthProvider, useAuth } from "@/providers/AuthProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { MigrationErrorView } from "@/components/MigrationErrorView";
import { runMigrations } from "@/db/migrations";
import { SplashView } from "@/components/SplashView";
import { errorTracking } from "@/services/ErrorTracking";
import { deepLinkingService } from "@/services/DeepLinkingService";

ensureReactQueryNative();

// Initialize Sentry early
errorTracking.init();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      retry: 2,
      refetchOnReconnect: true,
      refetchOnWindowFocus: false,
    },
  },
});

// Configure React Query Persistence
const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: "OFFLINE_CACHE",
});

persistQueryClient({
  queryClient,
  persister: asyncStoragePersister,
  maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
});

function InitialLayout() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [isDbReady, setIsDbReady] = useState(false);
  const [migrationError, setMigrationError] = useState<string | null>(null);
  const [migrationAttempt, setMigrationAttempt] = useState(0);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    let cancelled = false;
    setMigrationError(null);
    setIsDbReady(false);

    (async () => {
      try {
        await runMigrations();
        if (!cancelled) {
          setMigrationError(null);
        }
      } catch (e) {
        console.error("Migration error:", e);
        errorTracking.captureException(e, { context: "migrations" });
        if (!cancelled) {
          setMigrationError(
            "We could not update the local database. Your data on this device may be unavailable until this is fixed."
          );
        }
      } finally {
        if (!cancelled) {
          setIsDbReady(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [migrationAttempt]);

  const retryMigrations = useCallback(() => {
    setMigrationAttempt((n) => n + 1);
  }, []);

  const isLoading = isAuthLoading || !isDbReady;

  useEffect(() => {
    if (isLoading || migrationError) return;

    const inAuthGroup = segments[0] === "(auth)";
    const isPublicRoute = segments[0] === "onboarding"; // Whitelist

    if (!isAuthenticated && !inAuthGroup && !isPublicRoute) {
      router.replace("/login");
    } else if (isAuthenticated && inAuthGroup) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, migrationError, segments, router]);

  useEffect(() => {
    if (isLoading || migrationError) return;

    const removeListener = deepLinkingService.init();
    void Linking.getInitialURL().then((url) => {
      if (url) deepLinkingService.handleUrl(url);
    });

    return removeListener;
  }, [isLoading, migrationError]);

  if (isLoading) {
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

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ErrorBoundary>
        <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <InitialLayout />
            </AuthProvider>
          </QueryClientProvider>
        </SafeAreaProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
}
