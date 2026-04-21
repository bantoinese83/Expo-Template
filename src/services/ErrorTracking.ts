import * as Sentry from "@sentry/react-native";
import { env } from "../config/env";

/**
 * Agnostic Error Tracking Service (Sentry Implementation).
 * This acts as a wrapper for Sentry.
 */
class ErrorTrackingService {
  private isInitialized: boolean = false;

  init() {
    if (this.isInitialized) return;

    if (env.EXPO_PUBLIC_SENTRY_DSN) {
      Sentry.init({
        dsn: env.EXPO_PUBLIC_SENTRY_DSN,
        debug: __DEV__,
        environment: __DEV__ ? "development" : "production",
      });
      this.isInitialized = true;
      console.info("[ErrorTracking]: Sentry Tracking Service initialized");
    } else {
      console.warn("[ErrorTracking]: Sentry DSN missing. Error tracking is disabled.");
    }
  }

  /**
   * Captures an exception and sends it to Sentry.
   */
  captureException(error: Error | unknown, context?: Record<string, any>) {
    if (__DEV__) {
      console.error("[ErrorTracking] Capturing Exception:", error, context);
    }

    if (this.isInitialized) {
      Sentry.captureException(error, { extra: context });
    }
  }

  /**
   * Sets user information for log context.
   */
  setUser(userId: string, email?: string) {
    if (this.isInitialized) {
      Sentry.setUser({ id: userId, email });
    }
  }

  /**
   * Adds a breadcrumb to the current session.
   */
  addBreadcrumb(message: string, category?: string) {
    if (this.isInitialized) {
      Sentry.addBreadcrumb({ message, category });
    }
  }
}

export const errorTracking = new ErrorTrackingService();
