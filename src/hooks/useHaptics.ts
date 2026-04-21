import { useCallback } from "react";
import { hapticService } from "@/services/HapticService";

/**
 * Clean hook for triggering tactile feedback throughout the app.
 * Makes the codebase more "enjoyable" by simplifying logic to a single call.
 */
export function useHaptics() {
  const light = useCallback(() => hapticService.light(), []);
  const medium = useCallback(() => hapticService.medium(), []);
  const heavy = useCallback(() => hapticService.heavy(), []);
  const success = useCallback(() => hapticService.success(), []);
  const error = useCallback(() => hapticService.error(), []);
  const selection = useCallback(() => hapticService.selection(), []);

  return {
    light,
    medium,
    heavy,
    success,
    error,
    selection,
    // Direct access if needed
    trigger: hapticService,
  };
}
