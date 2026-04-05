import React from "react";
import { Stack } from "expo-router";

/**
 * Settings Stack Layout.
 * Provides a clean header for nested navigation.
 */
export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerShadowVisible: false,
        headerBackTitle: "Back",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Settings",
        }}
      />
      <Stack.Screen
        name="legal"
        options={{
          title: "Legal",
        }}
      />
    </Stack>
  );
}
