import * as Linking from "expo-linking";
import { router } from "expo-router";
import { logger } from "../utils/logger";

/**
 * Service to handle incoming deep links and universal links.
 * Consistent parsing and routing across the app.
 */
class DeepLinkingService {
  /**
   * Initializes the linking listener.
   */
  init() {
    const subscription = Linking.addEventListener("url", (event) => {
      this.handleUrl(event.url);
    });

    return () => subscription.remove();
  }

  /**
   * Parses and routes an incoming URL.
   */
  handleUrl(url: string) {
    try {
      const parsed = Linking.parse(url);

      if (__DEV__) {
        logger.info(`[Linking] Received URL: ${url}`, parsed);
      }

      // Example routing logic:
      // if (parsed.path === 'reset-password') {
      //   router.push({ pathname: '/(auth)/reset-password', params: parsed.queryParams });
      // }

      if (parsed.path) {
        // Fallback: attempt to route directly if path exists
        router.push(parsed.path as any);
      }
    } catch (error) {
      logger.error("[Linking] Failed to parse URL", error);
    }
  }

  /**
   * Helper to create a deep link for a specific route.
   */
  createLink(path: string, queryParams: Record<string, string> = {}) {
    return Linking.createURL(path, { queryParams });
  }
}

export const deepLinkingService = new DeepLinkingService();
