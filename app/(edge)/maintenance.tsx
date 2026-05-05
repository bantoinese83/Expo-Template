import React from "react";
import { View } from "react-native";
import { AppText, AppButton, ScreenWrapper } from "@/components/ui";
import { AlertCircle } from "lucide-react-native";

export default function MaintenanceScreen() {
  return (
    <ScreenWrapper className="bg-white dark:bg-slate-950">
      <View className="flex-1 items-center justify-center p-lg">
        <View className="w-24 h-24 bg-amber-50 dark:bg-amber-900/20 rounded-full items-center justify-center mb-8">
          <AlertCircle size={48} color="#f59e0b" />
        </View>

        <AppText variant="h1" className="text-center text-[30px] tracking-tight">
          System Maintenance
        </AppText>

        <AppText
          variant="body"
          className="text-center text-slate-500 dark:text-slate-400 mt-4 mb-10 leading-relaxed"
        >
          We're currently performing some scheduled maintenance to improve your experience. We'll be
          back online shortly.
        </AppText>

        <AppButton title="Try Again" className="w-full" variant="primary" />

        <AppText variant="caption" className="mt-8 text-slate-400">
          Estimated completion: 2:00 PM EST
        </AppText>
      </View>
    </ScreenWrapper>
  );
}
