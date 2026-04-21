import { useState, useCallback } from "react";
import * as Haptics from "expo-haptics";
import { logger } from "@/utils/logger";

interface UseOptimisticOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  haptic?: Haptics.ImpactFeedbackStyle | "none";
}

/**
 * A hook for managing "instant" commercial UX.
 * Updates local state immediately, then fires the remote action.
 * Automatically rolls back on failure with appropriate feedback.
 */
export function useOptimistic<T>(initialValue: T, options: UseOptimisticOptions<T> = {}) {
  const [value, setValue] = useState<T>(initialValue);
  const [isSyncing, setIsSyncing] = useState(false);

  const applyAction = useCallback(
    async (newValue: T, action: () => Promise<void>) => {
      const previousValue = value;
      setValue(newValue);
      setIsSyncing(true);

      // Feedback for the interaction
      if (options.haptic !== "none") {
        Haptics.impactAsync(options.haptic ?? Haptics.ImpactFeedbackStyle.Light);
      }

      try {
        await action();
        options.onSuccess?.(newValue);
      } catch (error) {
        // Rollback on failure
        setValue(previousValue);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        logger.error("Optimistic update failed, rolled back.", error);
        options.onError?.(error as Error);
      } finally {
        setIsSyncing(false);
      }
    },
    [value, options]
  );

  return [value, applyAction, isSyncing] as const;
}
