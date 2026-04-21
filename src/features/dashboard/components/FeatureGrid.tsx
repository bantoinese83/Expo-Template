import React from "react";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AppText } from "@/components/ui/AppText";
import { AppCard } from "@/components/ui/AppCard";

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

const FEATURES: Feature[] = [
  {
    icon: "shield-check",
    title: "Type Safety",
    desc: "Strictly typed props and state across all components.",
  },
  {
    icon: "layers-outline",
    title: "Architecture",
    desc: "Separation of concerns using hooks and services.",
  },
  {
    icon: "palette-outline",
    title: "NativeWind v4",
    desc: "Tailwind CSS for React Native with full dark mode support.",
  },
  {
    icon: "database-outline",
    title: "Local-First",
    desc: "SQLite + Drizzle ORM for high-speed offline capabilities.",
  },
];

export function FeatureCard({ icon, title, desc }: Feature) {
  return (
    <AppCard className="w-[48%] mb-md" padding="md">
      <View className="w-10 h-10 rounded-lg bg-primary/10 dark:bg-primary/20 items-center justify-center">
        <MaterialCommunityIcons name={icon as any} size={24} color="#6366f1" />
      </View>
      <AppText variant="h3" className="mt-md text-base">
        {title}
      </AppText>
      <AppText variant="body" className="text-slate-500 dark:text-slate-400 text-xs mt-xs leading-4">
        {desc}
      </AppText>
    </AppCard>
  );
}

export function FeatureGrid() {
  return (
    <View className="flex-row flex-wrap justify-between">
      {FEATURES.map((feature) => (
        <FeatureCard key={feature.title} {...feature} />
      ))}
    </View>
  );
}
