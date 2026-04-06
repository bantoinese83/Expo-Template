import { ensureReactQueryNative } from "@/query";
import { errorTracking } from "@/services/ErrorTracking";

/**
 * One-time native / monitoring setup for the app shell. Safe to call once at module load.
 */
export function bootstrapAppShell(): void {
  ensureReactQueryNative();
  errorTracking.init();
}
