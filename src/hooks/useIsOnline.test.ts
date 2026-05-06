import { renderHook, act } from "@testing-library/react-native";
import { useIsOnline } from "./useIsOnline";

let mockCallback: ((state: { isConnected: boolean }) => void) | null = null;

jest.mock("@react-native-community/netinfo", () => ({
  __esModule: true,
  default: {
    addEventListener: jest.fn((cb: any) => {
      mockCallback = cb;
      return jest.fn();
    }),
  },
}));

jest.mock("@/utils/logger", () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

jest.mock("@/services/ErrorTracking", () => ({
  errorTracking: {
    addBreadcrumb: jest.fn(),
    captureException: jest.fn(),
  },
}));

jest.mock("@/store/useLogStore", () => ({
  useLogStore: {
    getState: () => ({
      addLog: jest.fn(),
    }),
  },
}));

describe("useIsOnline", () => {
  beforeEach(() => {
    mockCallback = null;
  });

  it("defaults to online", () => {
    const { result } = renderHook(() => useIsOnline());
    expect(result.current).toBe(true);
  });

  it("updates to offline when network drops", () => {
    const { result } = renderHook(() => useIsOnline());

    act(() => {
      mockCallback?.({ isConnected: false });
    });

    expect(result.current).toBe(false);
  });

  it("updates back to online when network restores", () => {
    const { result } = renderHook(() => useIsOnline());

    act(() => {
      mockCallback?.({ isConnected: false });
    });
    expect(result.current).toBe(false);

    act(() => {
      mockCallback?.({ isConnected: true });
    });
    expect(result.current).toBe(true);
  });
});
