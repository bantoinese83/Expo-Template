import { useEffect } from "react";
import * as Linking from "expo-linking";

import { deepLinkingService } from "@/services/DeepLinkingService";

export type UseAppDeepLinksParams = {
  enabled: boolean;
};

/**
 * Subscribes to incoming URLs once the app shell is ready (after DB + auth gate).
 */
export function useAppDeepLinks(params: UseAppDeepLinksParams): void {
  const { enabled } = params;

  useEffect(() => {
    if (!enabled) return;

    const removeListener = deepLinkingService.init();
    void Linking.getInitialURL().then((url) => {
      if (url) deepLinkingService.handleUrl(url);
    });

    return removeListener;
  }, [enabled]);
}
