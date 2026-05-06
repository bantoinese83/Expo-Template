import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

import AppHeader from "@/components/AppHeader";
import { AppButton } from "@/components/ui/AppButton";
import { AppText } from "@/components/ui/AppText";
import { ScreenWrapper } from "@/components/ui/ScreenWrapper";
import { useAuth } from "@/hooks/useAuth";
import { getAvatarUrl } from "@/utils/avatar";

import { DashboardHero, DashboardStats } from "@/features/dashboard/components/DashboardHero";
import { FeatureGrid } from "@/features/dashboard/components/FeatureGrid";
import { GlassCard } from "premium-ui";
import { Platform } from "react-native";

/**
 * Main Application Dashboard.
 * Clean, composable architecture with sub-sections delegated to functional modules.
 */
export default function Home() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  return (
    <ScreenWrapper scrollable padding={false}>
      <AppHeader
        userName={user?.name || "Developer"}
        userImage={getAvatarUrl(user?.name || "Dev")}
        greeting="Welcome to"
        onNotificationPress={() => router.push("/notifications")}
        notificationCount={3}
      />

      <View className="px-lg pb-xl">
        {/* Hero Section */}
        <DashboardHero />

        {/* Glass Card Demo (Native SwiftUI - iOS only) */}
        {Platform.OS === "ios" && (
          <View className="my-lg">
            <GlassCard
              title="Native SwiftUI Experience"
              content="This glassmorphic card uses a real-time system blur material via the new Expo UI extension system. Smooth, fast, and premium."
              style={{ height: 160 }}
            />
          </View>
        )}

        {/* Stats Row */}
        <DashboardStats />

        {/* Features Content */}
        <View className="flex-row justify-between items-center mt-xl mb-sm">
          <AppText variant="h2" className="text-lg">
            Core Features
          </AppText>
          <TouchableOpacity onPress={() => router.push("/orders")}>
            <Text className="font-medium text-sm text-primary">Explore App</Text>
          </TouchableOpacity>
        </View>

        {/* Grid Section (Modularized) */}
        <FeatureGrid />

        {/* Footer & Actions */}
        <View className="mt-8 gap-y-4">
          <AppButton
            title="Demo Account Sign Out"
            onPress={signOut}
            variant="outline"
            className="border-rose-100 dark:border-rose-900/30"
            textClassName="text-rose-600"
          />

          <View className="pt-8 items-center">
            <AppText variant="body" className="text-slate-400 text-xs text-center">
              Made with ❤️ for the Expo developer community.{"\n"}
              <Text className="font-semibold text-slate-900 dark:text-white">Monarch Labs</Text>
            </AppText>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}
