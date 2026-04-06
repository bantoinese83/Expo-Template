/**
 * Pure routing rules for auth vs guest. Easy to unit test without Expo Router.
 */
export type AuthHref = "/login" | "/";

export type AuthRedirectDecision = { action: "none" } | { action: "replace"; href: AuthHref };

export type AuthRouteInput = {
  isAuthenticated: boolean;
  /** First segment from `useSegments()`, e.g. "(auth)", "(tabs)", "onboarding". */
  rootSegment: string | undefined;
  /** Route roots that do not require sign-in. */
  publicRoots?: readonly string[];
};

const DEFAULT_PUBLIC = ["onboarding"] as const;

export function getAuthRedirectDecision(input: AuthRouteInput): AuthRedirectDecision {
  const publicRoots = input.publicRoots ?? DEFAULT_PUBLIC;
  const root = input.rootSegment;
  const inAuthGroup = root === "(auth)";
  const isPublic = root !== undefined && publicRoots.includes(root);

  if (!input.isAuthenticated && !inAuthGroup && !isPublic) {
    return { action: "replace", href: "/login" };
  }
  if (input.isAuthenticated && inAuthGroup) {
    return { action: "replace", href: "/" };
  }
  return { action: "none" };
}
