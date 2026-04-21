import { useEffect, useMemo } from "react";
import { colorScheme as nativewindColorScheme } from "nativewind";
import { useAppStore } from "../store/useAppStore";
import { useColorScheme as useDeviceColorScheme } from "react-native";

/**
 * Theme persistence (Zustand) + NativeWind / RN appearance.
 *
 * Do **not** use NativeWind's `useColorScheme()` hook here: it subscribes to css-interop observables and
 * can synchronously flush updates during render/commit. That has been observed to trip React Navigation's
 * context ("Couldn't find a navigation context") when toggling scheme from screens like Profile.
 *
 * The imperative `colorScheme` API from NativeWind updates `Appearance` without hook subscriptions.
 */
export const useTheme = () => {
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);
  const deviceColorScheme = useDeviceColorScheme();

  const resolvedScheme = useMemo<"light" | "dark">(() => {
    if (theme === "system") {
      return deviceColorScheme === "dark" ? "dark" : "light";
    }
    return theme;
  }, [theme, deviceColorScheme]);

  useEffect(() => {
    if (theme === "system") {
      nativewindColorScheme.set("system");
    } else {
      nativewindColorScheme.set(resolvedScheme);
    }
  }, [theme, resolvedScheme]);

  const toggleTheme = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
  };

  return {
    theme,
    toggleTheme,
    colorScheme: resolvedScheme,
    isDark: resolvedScheme === "dark",
  };
};
