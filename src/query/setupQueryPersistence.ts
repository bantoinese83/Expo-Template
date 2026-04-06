import type { QueryClient } from "@tanstack/react-query";
import { persistQueryClient } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

const PERSIST_KEY = "OFFLINE_CACHE";
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 7;

export type AsyncStorageLike = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
};

/**
 * Persists the TanStack Query cache to AsyncStorage. Call once per `QueryClient` instance.
 */
export function setupQueryPersistence(queryClient: QueryClient, storage: AsyncStorageLike): void {
  const persister = createAsyncStoragePersister({
    storage,
    key: PERSIST_KEY,
  });

  persistQueryClient({
    queryClient,
    persister,
    maxAge: MAX_AGE_MS,
  });
}
