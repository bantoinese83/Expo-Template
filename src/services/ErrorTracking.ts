import * as Sentry from "@sentry/react-native";
import { env } from "../config/env";

/**
 * Agnostic Error Tracking Service (Sentry Implementation).
 * This service centralizes all error reporting and breadcrumb management.
 */
class ErrorTrackingService {
  private isInitialized: boolean = false;

  /**
   * Initializes the Sentry SDK if a DSN is provided.
   * Should be called once during the app bootstrap phase.
   */
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
   * Captures an exception and sends it to the tracking service.
   * @param {Error | unknown} error - The error object to report.
   * @param {Record<string, any>} [context] - Optional metadata to include with the error.
   *
   * @example
   * errorTracking.captureException(error, { screen: 'Login' });
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
   * Sets user information for the current session's error context.
   * @param {string} userId - The unique identifier for the user.
   * @param {string} [email] - The user's email address.
   */
  setUser(userId: string, email?: string) {
    if (this.isInitialized) {
      Sentry.setUser({ id: userId, email });
    }
  }

  /**
   * Adds a breadcrumb to the current session's timeline.
   * @param {string} message - A descriptive message of the event.
   * @param {string} [category] - The category of the event (e.g. 'ui', 'api').
   */
  addBreadcrumb(message: string, category?: string) {
    if (this.isInitialized) {
      Sentry.addBreadcrumb({ message, category });
    }
  }
}

export const errorTracking = new ErrorTrackingService();
