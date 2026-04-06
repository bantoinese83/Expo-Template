/**
 * In-memory access token for the Axios client. Replace with SecureStore / Clerk / Supabase
 * session in production; keep this module as the single place interceptors read from.
 */
let accessToken: string | null = null;

export function setSessionAccessToken(token: string | null): void {
  accessToken = token;
}

export function getSessionAccessToken(): string | null {
  return accessToken;
}
