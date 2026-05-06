import { renderHook, act } from "@testing-library/react-native";
import { useTheme } from "./useTheme";

jest.mock("nativewind", () => ({
  colorScheme: { set: jest.fn() },
}));

jest.mock("react-native-mmkv", () => {
  const store = new Map<string, string>();
  return {
    createMMKV: () => ({
      set: (key: string, value: string) => store.set(key, value),
      getString: (key: string) => store.get(key),
      remove: (key: string) => store.delete(key),
      clearAll: () => store.clear(),
    }),
  };
});

describe("useTheme", () => {
  it("defaults to system theme", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.theme).toBe("system");
    expect(["light", "dark"]).toContain(result.current.colorScheme);
  });

  it("toggles to dark mode", () => {
    const { result } = renderHook(() => useTheme());
    act(() => {
      result.current.toggleTheme("dark");
    });
    expect(result.current.theme).toBe("dark");
    expect(result.current.isDark).toBe(true);
  });

  it("toggles back to light mode", () => {
    const { result } = renderHook(() => useTheme());
    act(() => {
      result.current.toggleTheme("dark");
    });
    act(() => {
      result.current.toggleTheme("light");
    });
    expect(result.current.isDark).toBe(false);
  });
});
