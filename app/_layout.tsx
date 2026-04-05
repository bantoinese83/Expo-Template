import "../global.css";
import "../src/i18n";
import React, { useEffect, useState } from "react";
import { Stack, useRouter, useSegments } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { AuthProvider, useAuth } from "../src/providers/AuthProvider";
import { ErrorBoundary } from "../src/components/ErrorBoundary";
import { runMigrations } from "../src/db/migrations";
import { SplashView } from "../src/components/SplashView";
import { errorTracking } from "../src/services/ErrorTracking";

// Initialize Sentry early
errorTracking.init();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      retry: 2,
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
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        await runMigrations();
      } catch (e) {
        console.error("Migration error:", e);
        errorTracking.captureException(e, { context: "migrations" });
      } finally {
        setIsDbReady(true);
      }
    })();
  }, []);

  const isLoading = isAuthLoading || !isDbReady;

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";
    const isPublicRoute = segments[0] === "onboarding"; // Whitelist

    if (!isAuthenticated && !inAuthGroup && !isPublicRoute) {
      router.replace("/login");
    } else if (isAuthenticated && inAuthGroup) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, segments, router]);

  if (isLoading) {
    return <SplashView />;
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
