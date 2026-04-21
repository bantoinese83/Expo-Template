import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";
import { logger } from "@/utils/logger";

/**
 * Hook to track network connectivity status.
 * Useful for showing "Offline" banners or disabling active syncs.
 */
export function useIsOnline() {
  const [isOnline, setIsOnline] = useState<boolean | null>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(state.isConnected);

      if (state.isConnected) {
        logger.info("Network back online");
      } else {
        logger.warn("Network went offline");
      }
    });

    return () => unsubscribe();
  }, []);

  return isOnline;
}
