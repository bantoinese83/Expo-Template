import { useEffect } from "react";
import type { Href } from "expo-router";

import { getAuthRedirectDecision } from "./authRedirect";

export type RouterLike = {
  replace: (href: Href) => void;
};

export type UseAuthRouteSyncParams = {
  isAuthenticated: boolean;
  isBootstrapping: boolean;
  migrationError: string | null;
  segments: string[];
  router: RouterLike;
  publicRoots?: readonly string[];
};

/**
 * Keeps navigation aligned with auth state. Side effects isolated for testing via `getAuthRedirectDecision`.
 */
export function useAuthRouteSync(params: UseAuthRouteSyncParams): void {
  const { isAuthenticated, isBootstrapping, migrationError, segments, router, publicRoots } =
    params;

  useEffect(() => {
    if (isBootstrapping || migrationError) return;

    const decision = getAuthRedirectDecision({
      isAuthenticated,
      rootSegment: segments[0],
      publicRoots,
    });

    if (decision.action === "replace") {
      router.replace(decision.href);
    }
  }, [isAuthenticated, isBootstrapping, migrationError, segments, router, publicRoots]);
}
