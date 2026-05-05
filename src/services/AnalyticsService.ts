import PostHog from "posthog-react-native";
import { env } from "../config/env";

/**
 * Agnostic Analytics Service with PostHog Implementation.
 * Provides a unified interface for analytics and feature flags.
 */
class AnalyticsService {
  private isInitialized: boolean = false;
  private posthog: PostHog | null = null;

  /**
   * Initializes the PostHog provider.
   */
  async init() {
    if (this.isInitialized) return;

    if (env.EXPO_PUBLIC_POSTHOG_API_KEY) {
      this.posthog = new PostHog(env.EXPO_PUBLIC_POSTHOG_API_KEY, {
        host: env.EXPO_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
      });

      await this.posthog.ready();
      this.isInitialized = true;

      if (__DEV__) {
        console.info("[AnalyticsService]: PostHog Analytics initialized");
      }
    } else {
      if (__DEV__) {
        console.warn("[AnalyticsService]: PostHog Key missing. Running in Mock Mode.");
      }
    }
  }

  /**
   * Tracks a custom event.
   */
  trackEvent(eventName: string, properties?: Record<string, any>) {
    if (__DEV__) {
      console.info(`[AnalyticsService] Track: ${eventName}`, properties);
    }

    if (this.posthog) {
      this.posthog.capture(eventName, properties);
    }
  }

  /**
   * Identifies the current user.
   */
  identifyUser(userId: string, traits?: Record<string, any>) {
    if (__DEV__) {
      console.info(`[AnalyticsService] Identify: ${userId}`, traits);
    }

    if (this.posthog) {
      this.posthog.identify(userId, traits);
    }
  }

  /**
   * Resets the current user (e.g., on logout).
   */
  reset() {
    if (__DEV__) {
      console.info("[AnalyticsService] Reset");
    }

    if (this.posthog) {
      this.posthog.reset();
    }
  }

  /**
   * Checks if a feature flag is enabled.
   */
  isFeatureEnabled(flag: string): boolean {
    if (this.posthog) {
      return !!this.posthog.isFeatureEnabled(flag);
    }
    return false;
  }

  /**
   * Returns the underlying PostHog instance for advanced usage.
   */
  getPostHog() {
    return this.posthog;
  }
}

export const analytics = new AnalyticsService();
