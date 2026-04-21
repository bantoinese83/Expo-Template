import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "user_session_token";

/**
 * In-memory access token for the Axios client.
 * Provides synchronous access for interceptors while syncing with SecureStore.
 */
let accessToken: string | null = null;

/**
 * Loads the token from SecureStore into memory.
 * Should be called during app initialization.
 */
export async function initSession(): Promise<string | null> {
  try {
    accessToken = await SecureStore.getItemAsync(TOKEN_KEY);
    return accessToken;
  } catch (error) {
    console.error("[SessionToken] Failed to load token from SecureStore", error);
    return null;
  }
}

/**
 * Updates the session token both in memory and in SecureStore.
 */
export async function setSessionAccessToken(token: string | null): Promise<void> {
  accessToken = token;
  try {
    if (token) {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
    } else {
      await SecureStore.deleteItemAsync(TOKEN_KEY);
    }
  } catch (error) {
    console.error("[SessionToken] Failed to persist token to SecureStore", error);
  }
}

/**
 * Synchronous access for Axios interceptors.
 */
export function getSessionAccessToken(): string | null {
  return accessToken;
}

type Listener = () => void;
const listeners = new Set<Listener>();

/**
 * Subscribe to session expiration events (e.g., 401 Unauthorized).
 */
export function onSessionExpired(listener: Listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/**
 * Emits a session expiration event.
 */
export function emitSessionExpired() {
  listeners.forEach((l) => l());
}
