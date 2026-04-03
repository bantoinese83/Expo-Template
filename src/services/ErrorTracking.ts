import { logger } from "../utils/logger";

/**
 * Agnostic Error Tracking Service.
 * This acts as a wrapper for services like Sentry, Bugsnag, or Datadog.
 * In a production app, initialize your tracking SDK here.
 */
class ErrorTrackingService {
  private isInitialized: boolean = false;

  init() {
    if (this.isInitialized) return;

    // TODO: Initialize Sentry or other service
    // Sentry.init({ dsn: 'YOUR_DSN' });

    this.isInitialized = true;
    logger.info("Error Tracking Service initialized (Mocked)");
  }

  /**
   * Captures an exception and sends it to the configured tracking service.
   */
  captureException(error: Error | unknown, context?: Record<string, any>) {
    logger.error("Capturing Exception", error, context);

    if (this.isInitialized) {
      // Sentry.captureException(error, { extra: context });
    }
  }

  /**
   * Sets user information for log context.
   */
  setUser(userId: string, email?: string) {
    if (this.isInitialized) {
      // Sentry.setUser({ id: userId, email });
    }
  }

  /**
   * Adds a breadcrumb to the current session.
   */
  addBreadcrumb(message: string, category?: string) {
    if (this.isInitialized) {
      // Sentry.addBreadcrumb({ message, category });
    }
  }
}

export const errorTracking = new ErrorTrackingService();
