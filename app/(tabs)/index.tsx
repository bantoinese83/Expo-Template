import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import AppHeader from "../../src/components/AppHeader";
import { AppButton } from "../../src/components/ui/AppButton";
import { AppText } from "../../src/components/ui/AppText";
import { AppCard } from "../../src/components/ui/AppCard";
import { ScreenWrapper } from "../../src/components/ui/ScreenWrapper";
import { useAuth } from "../../src/hooks/useAuth";
import { getAvatarUrl } from "../../src/utils/avatar";

const FeatureCard = ({ icon, title, desc }: { icon: any; title: string; desc: string }) => (
  <AppCard className="w-[48%] mb-4" padding="md">
    <View className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 items-center justify-center">
      <MaterialCommunityIcons name={icon} size={24} color="#6366f1" />
    </View>
    <AppText variant="h3" className="mt-3 text-base">
      {title}
    </AppText>
    <AppText variant="body" className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-4">
      {desc}
    </AppText>
  </AppCard>
);

export default function Home() {
  const { user, signOut } = useAuth();
  const router = useRouter();

  return (
    <ScreenWrapper scrollable padding={false}>
      <AppHeader
        userName={user?.name || "Developer"}
        userImage={getAvatarUrl(user?.name || "Dev")}
        greeting="Welcome to"
        onNotificationPress={() => {}}
        notificationCount={3}
      />

      <View className="px-5 pb-10">
        {/* Hero Section */}
        <View className="py-8 items-center">
          <AppText variant="h1" className="text-center text-3xl">
            The Ultimate Expo{"\n"}
            <Text className="text-primary">TypeScript Template</Text>
          </AppText>
          <AppText
            variant="body"
            className="text-center text-slate-500 dark:text-slate-400 mt-4 text-sm leading-5 px-4"
          >
            Enterprise-ready foundation with strict typing, clean architecture, and modern styling
            powered by NativeWind.
          </AppText>
        </View>

        {/* Stats Row */}
        <View className="flex-row bg-primary/5 dark:bg-primary/10 rounded-2xl py-5 items-center justify-around">
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

        {/* Features Content */}
        <View className="flex-row justify-between items-center mt-10 mb-4">
          <AppText variant="h2" className="text-lg">
            Core Features
          </AppText>
          <TouchableOpacity onPress={() => router.push("/orders")}>
            <Text className="font-medium text-sm text-primary">Explore App</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row flex-wrap justify-between">
          <FeatureCard
            icon="shield-check"
            title="Type Safety"
            desc="Strictly typed props and state across all components."
          />
          <FeatureCard
            icon="layers-outline"
            title="Architecture"
            desc="Separation of concerns using hooks and services."
          />
          <FeatureCard
            icon="palette-outline"
            title="NativeWind v4"
            desc="Tailwind CSS for React Native with full dark mode support."
          />
          <FeatureCard
            icon="database-outline"
            title="Local-First"
            desc="SQLite + Drizzle ORM for high-speed offline capabilities."
          />
        </View>

        {/* Footer & Actions */}
        <View className="mt-8 space-y-4">
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
