import { getAuthRedirectDecision } from "./authRedirect";

describe("getAuthRedirectDecision", () => {
  it("sends guests to login when not on auth or public route", () => {
    expect(
      getAuthRedirectDecision({
        isAuthenticated: false,
        rootSegment: "(tabs)",
      })
    ).toEqual({ action: "replace", href: "/login" });
  });

  it("allows onboarding without auth", () => {
    expect(
      getAuthRedirectDecision({
        isAuthenticated: false,
        rootSegment: "onboarding",
      })
    ).toEqual({ action: "none" });
  });

  it("allows auth routes for guests", () => {
    expect(
      getAuthRedirectDecision({
        isAuthenticated: false,
        rootSegment: "(auth)",
      })
    ).toEqual({ action: "none" });
  });

  it("sends signed-in users away from auth group", () => {
    expect(
      getAuthRedirectDecision({
        isAuthenticated: true,
        rootSegment: "(auth)",
      })
    ).toEqual({ action: "replace", href: "/" });
  });

  it("does nothing when signed in on main app", () => {
    expect(
      getAuthRedirectDecision({
        isAuthenticated: true,
        rootSegment: "(tabs)",
      })
    ).toEqual({ action: "none" });
  });

  it("respects custom public roots", () => {
    expect(
      getAuthRedirectDecision({
        isAuthenticated: false,
        rootSegment: "marketing",
        publicRoots: ["marketing"],
      })
    ).toEqual({ action: "none" });
  });
});
