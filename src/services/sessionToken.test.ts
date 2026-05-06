import {
  getSessionAccessToken,
  setSessionAccessToken,
  onSessionExpired,
  emitSessionExpired,
} from "./sessionToken";

jest.mock("expo-secure-store", () => ({
  getItemAsync: jest.fn().mockResolvedValue(null),
  setItemAsync: jest.fn().mockResolvedValue(undefined),
  deleteItemAsync: jest.fn().mockResolvedValue(undefined),
}));

describe("sessionToken", () => {
  afterEach(async () => {
    await setSessionAccessToken(null);
  });

  it("returns null when no token is set", () => {
    expect(getSessionAccessToken()).toBeNull();
  });

  it("stores and retrieves a token synchronously", async () => {
    await setSessionAccessToken("test-token-123");
    expect(getSessionAccessToken()).toBe("test-token-123");
  });

  it("clears the token", async () => {
    await setSessionAccessToken("abc");
    await setSessionAccessToken(null);
    expect(getSessionAccessToken()).toBeNull();
  });

  it("emits session expiration to all listeners", () => {
    const listener1 = jest.fn();
    const listener2 = jest.fn();

    const unsub1 = onSessionExpired(listener1);
    const unsub2 = onSessionExpired(listener2);

    emitSessionExpired();

    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(1);

    unsub1();
    unsub2();
  });

  it("unsubscribes listeners correctly", () => {
    const listener = jest.fn();
    const unsub = onSessionExpired(listener);

    unsub();
    emitSessionExpired();

    expect(listener).not.toHaveBeenCalled();
  });
});
