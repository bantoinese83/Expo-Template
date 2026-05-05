import React from "react";
import { View, Linking, Platform } from "react-native";
import { AppText, AppButton, ScreenWrapper } from "@/components/ui";
import { ArrowUpCircle } from "lucide-react-native";

export default function ForceUpdateScreen() {
  const handleUpdate = () => {
    const url =
      Platform.OS === "ios"
        ? "https://apps.apple.com/app/idYOUR_APP_ID"
        : "https://play.google.com/store/apps/details?id=YOUR_PACKAGE_NAME";
    Linking.openURL(url);
  };

  return (
    <ScreenWrapper className="bg-white dark:bg-slate-950">
      <View className="flex-1 items-center justify-center p-lg">
        <View className="w-24 h-24 bg-indigo-50 dark:bg-indigo-900/20 rounded-full items-center justify-center mb-8">
          <ArrowUpCircle size={48} color="#6366f1" />
        </View>

        <AppText variant="h1" className="text-center text-[30px] tracking-tight">
          Update Required
        </AppText>

        <AppText
          variant="body"
          className="text-center text-slate-500 dark:text-slate-400 mt-4 mb-10 leading-relaxed"
        >
          A new version of Expo Template is available. Please update to the latest version to
          continue using the application.
        </AppText>

        <AppButton title="Update Now" className="w-full" onPress={handleUpdate} />

        <AppText variant="caption" className="mt-8 text-slate-400">
          Current Version: 1.0.0
        </AppText>
      </View>
    </ScreenWrapper>
  );
}
