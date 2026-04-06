import AsyncStorage from "@react-native-async-storage/async-storage";
import type { QueryClient } from "@tanstack/react-query";

import { createAppQueryClient, setupQueryPersistence } from "@/query";

let client: QueryClient | null = null;

/**
 * Shared QueryClient for production shell. Tests should pass their own client via `AppProviders`.
 */
export function getOrCreateQueryClient(): QueryClient {
  if (!client) {
    client = createAppQueryClient();
    setupQueryPersistence(client, AsyncStorage);
  }
  return client;
}

/** Test-only reset when you need a clean cache without reloading the bundle. */
export function resetQueryClientSingletonForTests(): void {
  client = null;
}
