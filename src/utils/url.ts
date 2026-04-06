/**
 * Central place for app URL helpers. Prefer `env.EXPO_PUBLIC_API_URL` in `src/config/env.ts`
 * for your HTTP API base; avoid hardcoding third-party hosts in the template.
 */
export function joinUrl(base: string, path: string): string {
  const b = base.endsWith("/") ? base.slice(0, -1) : base;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${b}${p}`;
}
