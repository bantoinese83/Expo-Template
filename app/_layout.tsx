import "../global.css";
import "../src/i18n";
import { Stack, useRouter, useSegments } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider, useAuth } from "../src/providers/AuthProvider";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { ErrorBoundary } from "../src/components/ErrorBoundary";
import { runMigrations } from "../src/db/migrations";
import { SplashView } from "../src/components/SplashView";

const queryClient = new QueryClient();

function InitialLayout() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [isDbReady, setIsDbReady] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await runMigrations();
      setIsDbReady(true);
    })();
  }, []);

  const isLoading = isAuthLoading || !isDbReady;

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      router.replace("/login");
    } else if (isAuthenticated && inAuthGroup) {
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, segments]);

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

import { KeyboardProvider } from "react-native-keyboard-controller";

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
        <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <InitialLayout />
            </AuthProvider>
          </QueryClientProvider>
        </SafeAreaProvider>
      </KeyboardProvider>
    </ErrorBoundary>
  );
}
