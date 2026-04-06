import React, { useMemo } from "react";
import type { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "@/features/auth";
import { ErrorBoundary } from "@/components/ErrorBoundary";

import { getOrCreateQueryClient } from "./queryClientSingleton";

export type AppProvidersProps = {
  children: React.ReactNode;
  /** Override for tests or Storybook; defaults to persisted singleton. */
  queryClient?: QueryClient;
};

/**
 * Composable root providers. Order is intentional: gestures → errors → safe area → data → auth.
 */
export function AppProviders({ children, queryClient: queryClientProp }: AppProvidersProps) {
  const queryClient = useMemo(() => queryClientProp ?? getOrCreateQueryClient(), [queryClientProp]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ErrorBoundary>
        <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        </SafeAreaProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
}
