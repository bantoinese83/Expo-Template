import { createMMKV } from "react-native-mmkv";
import type { StateStorage } from "zustand/middleware";

/**
 * Main MMKV instance for the application.
 * Using a centralized instance ensures consistency and performance.
 *
 * MMKV V4 is a Nitro Module and requires the New Architecture to be enabled.
 */
export const storage = createMMKV({
  id: "app-storage",
});

/**
 * Adapter for Zustand persist middleware.
 * Provides synchronous storage for faster hydration.
 */
export const zustandStorage: StateStorage = {
  setItem: (name, value) => {
    storage.set(name, value);
  },
  getItem: (name) => {
    const value = storage.getString(name);
    return value ?? null;
  },
  removeItem: (name) => {
    storage.remove(name);
  },
};

/**
 * Adapter for TanStack Query persistence.
 * Wraps synchronous MMKV calls in Promises as required by the persister.
 */
export const queryStorage = {
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

/**
 * Type-safe storage helpers for common data types.
 */
export const StorageHelper = {
  /**
   * Saves a JSON object to storage.
   */
  setObject: <T>(key: string, value: T) => {
    try {
      storage.set(key, JSON.stringify(value));
    } catch (error) {
      console.error(`[StorageHelper] Error saving object for key "${key}":`, error);
    }
  },

  /**
   * Retrieves a JSON object from storage.
   */
  getObject: <T>(key: string): T | null => {
    try {
      const value = storage.getString(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`[StorageHelper] Error retrieving object for key "${key}":`, error);
      return null;
    }
  },

  /**
   * Deletes a key from storage.
   */
  remove: (key: string) => {
    storage.remove(key);
  },

  /**
   * Clears all data in this MMKV instance.
   */
  clearAll: () => {
    storage.clearAll();
  },
};
