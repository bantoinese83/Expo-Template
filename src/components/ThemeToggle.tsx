import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../hooks/useTheme";
import * as Haptics from "expo-haptics";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

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
      {themes.map((t) => (
        <TouchableOpacity
          key={t.value}
          onPress={() => handleToggle(t.value)}
          className={`flex-1 flex-row items-center justify-center py-2.5 px-3 rounded-xl ${
            theme === t.value ? "bg-white dark:bg-slate-800 shadow-sm" : ""
          }`}
        >
          <MaterialCommunityIcons
            name={t.icon}
            size={18}
            color={theme === t.value ? "#6366f1" : "#94a3b8"}
          />
          {theme === t.value && (
            <Text className="ml-2.5 text-xs font-semibold tracking-tight text-slate-900 dark:text-white">
              {t.label}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};
