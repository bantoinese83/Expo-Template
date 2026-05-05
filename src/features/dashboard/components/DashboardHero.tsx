import React from "react";
import { View, Text } from "react-native";
import { AppText } from "@/components/ui/AppText";

export function DashboardHero() {
  return (
    <View className="py-xl items-center">
      <AppText variant="h1" className="text-center text-[34px] leading-tight tracking-tight">
        The Ultimate Expo{"\n"}
        <Text className="text-primary">TypeScript Template</Text>
      </AppText>
      <AppText
        variant="body"
        className="text-center text-slate-500 dark:text-slate-400 mt-5 text-[15px] leading-relaxed px-4"
      >
        Enterprise-ready foundation with strict typing, clean architecture, and modern styling
        powered by NativeWind.
      </AppText>
    </View>
  );
}

export function DashboardStats() {
  return (
    <View className="flex-row bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800/50 rounded-2xl py-5 px-2 items-center justify-around shadow-sm">
      <View className="items-center flex-1">
        <Text className="font-bold text-xl tracking-tight text-primary">0</Text>
        <Text className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mt-1">
          Type Errors
        </Text>
      </View>
      <View className="w-[1px] h-6 bg-slate-200 dark:bg-slate-800" />
      <View className="items-center flex-1">
        <Text className="font-bold text-xl tracking-tight text-emerald-500">100%</Text>
        <Text className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mt-1">
          Strict Mode
        </Text>
      </View>
      <View className="w-[1px] h-6 bg-slate-200 dark:bg-slate-800" />
      <View className="items-center flex-1">
        <Text className="font-bold text-xl tracking-tight text-sky-400">v2026</Text>
        <Text className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mt-1">
          Stability
        </Text>
      </View>
    </View>
  );
}
