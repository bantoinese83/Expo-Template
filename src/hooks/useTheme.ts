import { useEffect } from "react";
import { useColorScheme as useNativeWindColorScheme } from "nativewind";
import { useAppStore } from "../store/useAppStore";
import { useColorScheme as useDeviceColorScheme } from "react-native";

export const useTheme = () => {
  const { colorScheme, setColorScheme } = useNativeWindColorScheme();
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);
  const deviceColorScheme = useDeviceColorScheme();

  // Sync with NativeWind on theme change
  useEffect(() => {
    if (theme === "system") {
      setColorScheme(deviceColorScheme ?? "light");
    } else {
      setColorScheme(theme);
    }
  }, [theme, deviceColorScheme, setColorScheme]);

  const toggleTheme = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
  };

  return {
    theme,
    toggleTheme,
    colorScheme, // The actual active color scheme (light or dark)
    isDark: colorScheme === "dark",
  };
};
