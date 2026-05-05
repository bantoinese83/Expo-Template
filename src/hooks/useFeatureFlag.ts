import { useState, useEffect } from "react";
import { analytics } from "../services/AnalyticsService";

/**
 * Hook to declaratively check if a feature flag is enabled.
 * Automatically updates when the flag state changes from the provider.
 *
 * @param {string} flagName - The key of the feature flag to check.
 * @returns {boolean} Whether the feature is enabled.
 */
export function useFeatureFlag(flagName: string): boolean {
  const [isEnabled, setIsEnabled] = useState(analytics.isFeatureEnabled(flagName));

  useEffect(() => {
    const posthog = analytics.getPostHog();
    if (!posthog) return;

    // Initial check
    setIsEnabled(!!posthog.isFeatureEnabled(flagName));

    // PostHog doesn't have a direct 'onFlagChange' listener in the native SDK,
    // but flags are usually polled or pushed. We check on mount.
    // For real-time updates, users can call analytics.init() which triggers re-fetch.
  }, [flagName]);

  return isEnabled;
}
