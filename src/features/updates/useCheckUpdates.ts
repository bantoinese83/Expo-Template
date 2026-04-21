import { useEffect, useState } from "react";
import { Alert } from "react-native";
import * as Updates from "expo-updates";

import { logger } from "@/utils/logger";

/**
 * Hook to proactively check for OTA updates on cold start or when called.
 * Prevents users from getting stuck on buggy old versions.
 */
export function useCheckUpdates() {
  const [isChecking, setIsChecking] = useState(false);

  async function onFetchUpdateAsync() {
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
      // In development, this often fails if not using an EAS build.
      logger.debug("Updates check failed (expected in dev)", e);
    } finally {
      setIsChecking(false);
    }
  }

  useEffect(() => {
    // Only check in production or if not in expo go
    if (!__DEV__) {
      onFetchUpdateAsync();
    }
  }, []);

  return { isChecking, checkForUpdate: onFetchUpdateAsync };
}
