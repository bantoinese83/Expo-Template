import { StatusBar } from "expo-status-bar";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../src/components/AppHeader";
import PrimaryButton from "../src/components/common/PrimaryButton";
import { getAvatarUrl } from "../src/utils/avatar";
import { useAuth } from "../src/hooks/useAuth";
import React from "react";

const FeatureCard = ({ icon, title, desc }: { icon: any; title: string; desc: string }) => (
  <View className="w-[47%] bg-white rounded-2xl p-4 mb-4 border border-slate-200 shadow-sm">
    <View className="w-10 h-10 rounded-lg bg-indigo-50 items-center justify-center">
      <MaterialCommunityIcons name={icon} size={24} color="#6366f1" />
    </View>
    <Text className="text-slate-900 font-semibold text-base mt-3">{title}</Text>
    <Text className="text-slate-500 text-xs mt-1 leading-4">{desc}</Text>
  </View>
);

export default function Home() {
  const { user, signOut } = useAuth();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top", "left", "right"]}>
      <StatusBar style="dark" />
      <AppHeader
        userName={user?.name || "Developer"}
        userImage={getAvatarUrl(user?.name || "Dev")}
        greeting="Welcome to"
        onNotificationPress={() => {}}
        notificationCount={3}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Hero Section */}
        <View className="px-6 py-8 items-center">
          <Text className="text-center font-bold text-2xl leading-9">
            The Ultimate Expo{"\n"}
            <Text className="text-indigo-600">TypeScript Template</Text>
          </Text>
          <Text className="text-center text-slate-500 mt-4 text-sm leading-5 px-2">
            Enterprise-ready foundation with strict typing, clean architecture, and modern styling
            powered by NativeWind.
          </Text>
          <View className="mt-6 w-[60%] h-12">
            <PrimaryButton title="Sign Out (Demo)" onPress={signOut} className="bg-slate-200" />
          </View>
        </View>

        {/* Stats Row */}
        <View className="flex-row bg-indigo-50/50 mx-6 rounded-2xl py-4 items-center justify-around">
          <View className="items-center">
            <Text className="font-bold text-lg text-indigo-600">0</Text>
            <Text className="text-[11px] text-slate-500">Type Errors</Text>
          </View>
          <View className="w-[1px] h-3/5 bg-slate-200" />
          <View className="items-center">
            <Text className="font-bold text-lg text-emerald-500">100%</Text>
            <Text className="text-[11px] text-slate-500">Strict Mode</Text>
          </View>
          <View className="w-[1px] h-3/5 bg-slate-200" />
          <View className="items-center">
            <Text className="font-bold text-lg text-sky-400">v2026</Text>
            <Text className="text-[11px] text-slate-500">Stability</Text>
          </View>
        </View>

        {/* Features Grid */}
        <View className="flex-row justify-between items-center px-6 mt-8 mb-4">
          <Text className="font-semibold text-lg">Core Features</Text>
          <TouchableOpacity>
            <Text className="font-medium text-sm text-indigo-600">See All</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row flex-wrap px-4 justify-between">
          <FeatureCard
            icon="shield-check"
            title="Type Safety"
            desc="Strictly typed props and state across all components."
          />
          <FeatureCard
            icon="layers-outline"
            title="Clean Architecture"
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

        {/* Footer */}
        <View className="mt-10 items-center">
          <Text className="text-slate-400 text-xs">Made with ❤️ by</Text>
          <Text className="font-semibold text-sm text-slate-900 mt-1">Monarch Labs</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
