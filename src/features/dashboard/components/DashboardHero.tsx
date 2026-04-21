import React from "react";
import { View, Text } from "react-native";
import { AppText } from "@/components/ui/AppText";

export function DashboardHero() {
  return (
    <View className="py-lg items-center">
      <AppText variant="h1" className="text-center text-3xl">
        The Ultimate Expo{"\n"}
        <Text className="text-primary">TypeScript Template</Text>
      </AppText>
      <AppText
        variant="body"
        className="text-center text-slate-500 dark:text-slate-400 mt-md text-sm leading-5 px-sm"
      >
        Enterprise-ready foundation with strict typing, clean architecture, and modern styling
        powered by NativeWind.
      </AppText>
    </View>
  );
}

export function DashboardStats() {
  return (
    <View className="flex-row bg-primary/5 dark:bg-primary/10 rounded-2xl py-md items-center justify-around">
      <View className="items-center">
        <Text className="font-bold text-xl text-primary">0</Text>
        <Text className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
          Type Errors
        </Text>
      </View>
      <View className="w-[1px] h-3/5 bg-slate-200 dark:bg-slate-800" />
      <View className="items-center">
        <Text className="font-bold text-xl text-emerald-500">100%</Text>
        <Text className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
          Strict Mode
        </Text>
      </View>
      <View className="w-[1px] h-3/5 bg-slate-200 dark:bg-slate-800" />
      <View className="items-center">
        <Text className="font-bold text-xl text-sky-400">v2026</Text>
        <Text className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
          Stability
        </Text>
      </View>
    </View>
  );
}
