import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../hooks/useTheme";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const themes: { label: string; value: "light" | "dark" | "system"; icon: any }[] = [
    { label: "Light", value: "light", icon: "weather-sunny" },
    { label: "Dark", value: "dark", icon: "weather-night" },
    { label: "System", value: "system", icon: "monitor" },
  ];

  return (
    <View className="flex-row bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
      {themes.map((t) => (
        <TouchableOpacity
          key={t.value}
          onPress={() => toggleTheme(t.value)}
          className={`flex-1 flex-row items-center justify-center py-2 px-3 rounded-lg ${
            theme === t.value ? "bg-white dark:bg-slate-700" : ""
          }`}
          style={
            theme === t.value
              ? {
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.1,
                  shadowRadius: 1,
                  elevation: 1,
                }
              : undefined
          }
        >
          <MaterialCommunityIcons
            name={t.icon}
            size={18}
            color={theme === t.value ? "#6366f1" : "#94a3b8"}
          />
          {theme === t.value && (
            <Text className="ml-2 text-xs font-semibold text-slate-900 dark:text-white">
              {t.label}
            </Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};
