import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../hooks/useTheme";
import * as Haptics from "expo-haptics";

/**
 * Uses Pressable with `style` prop instead of TouchableOpacity with `className`
 * to avoid NativeWind's CssInterop.TouchableOpacity wrapper, which can
 * synchronously flush style updates during render and trip React Navigation's
 * context ("Couldn't find a navigation context") during auth transitions.
 */
export const ThemeToggle = () => {
  const { theme, toggleTheme, isDark } = useTheme();

  const handleToggle = (value: "light" | "dark" | "system") => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    toggleTheme(value);
  };

  const themes: { label: string; value: "light" | "dark" | "system"; icon: any }[] = [
    { label: "Light", value: "light", icon: "weather-sunny" },
    { label: "Dark", value: "dark", icon: "weather-night" },
    { label: "System", value: "system", icon: "monitor" },
  ];

  return (
    <View className="flex-row bg-slate-50 dark:bg-slate-900/50 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-800/50">
      {themes.map((t) => {
        const isActive = theme === t.value;
        return (
          <Pressable
            key={t.value}
            onPress={() => handleToggle(t.value)}
            style={[
              styles.button,
              isActive && [
                styles.buttonActive,
                { backgroundColor: isDark ? "#1e293b" : "#ffffff" },
              ],
            ]}
            accessibilityRole="button"
            accessibilityLabel={`${t.label} theme`}
            accessibilityState={{ selected: isActive }}
          >
            <MaterialCommunityIcons
              name={t.icon}
              size={18}
              color={isActive ? "#6366f1" : "#94a3b8"}
            />
            {isActive && (
              <Text className="ml-2.5 text-xs font-semibold tracking-tight text-slate-900 dark:text-white">
                {t.label}
              </Text>
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  buttonActive: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
});
