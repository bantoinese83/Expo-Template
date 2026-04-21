import type { QueryClient } from "@tanstack/react-query";
import { createMMKV } from "react-native-mmkv";

import { createAppQueryClient, setupQueryPersistence } from "@/query";

const storage = createMMKV();

const clientStorage = {
  setItem: (name: string, value: string) => {
    storage.set(name, value);
    return Promise.resolve();
  },
  getItem: (name: string) => {
    const value = storage.getString(name);
    return Promise.resolve(value ?? null);
  },
  removeItem: (name: string) => {
    storage.remove(name);
    return Promise.resolve();
  },
};

let client: QueryClient | null = null;

/**
 * Shared QueryClient for production shell. Tests should pass their own client via `AppProviders`.
 */
export function getOrCreateQueryClient(): QueryClient {
  if (!client) {
    client = createAppQueryClient();
    setupQueryPersistence(client, clientStorage);
  }
  return client;
}

/** Test-only reset when you need a clean cache without reloading the bundle. */
export function resetQueryClientSingletonForTests(): void {
  client = null;
}
