import type { QueryClient } from "@tanstack/react-query";
import { createAppQueryClient, setupQueryPersistence } from "@/query";
import { queryStorage } from "@/services/storage";

let client: QueryClient | null = null;

/**
 * Shared QueryClient for production shell. Tests should pass their own client via `AppProviders`.
 */
export function getOrCreateQueryClient(): QueryClient {
  if (!client) {
    client = createAppQueryClient();
    setupQueryPersistence(client, queryStorage);
  }
  return client;
}

/** Test-only reset when you need a clean cache without reloading the bundle. */
export function resetQueryClientSingletonForTests(): void {
  client = null;
}
