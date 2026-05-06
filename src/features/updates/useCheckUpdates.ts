import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import * as Updates from "expo-updates";

import { logger } from "@/utils/logger";

/**
 * Hook to proactively check for OTA updates on cold start or when called.
 * Prevents users from getting stuck on buggy old versions.
 */
export function useCheckUpdates() {
  const [isChecking, setIsChecking] = useState(false);

  const checkForUpdate = useCallback(async () => {
    try {
      setIsChecking(true);
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        Alert.alert(
          "Update Available",
          "A newer version of the app is available. Would you like to update now?",
          [
            { text: "Later", style: "cancel" },
            {
              text: "Update Now",
              onPress: async () => {
                try {
                  await Updates.fetchUpdateAsync();
                  await Updates.reloadAsync();
                } catch (e) {
                  logger.error("Failed to fetch or apply update", e);
                  Alert.alert("Error", "Failed to download the update. Please try again later.");
                }
              },
            },
          ]
        );
      }
    } catch (e) {
      logger.debug("Updates check failed (expected in dev)", e);
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    if (!__DEV__) {
      checkForUpdate();
    }
  }, [checkForUpdate]);

  return { isChecking, checkForUpdate };
}
