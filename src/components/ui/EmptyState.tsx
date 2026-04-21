import React from "react";
import { View } from "react-native";
import { LucideIcon, Info } from "lucide-react-native";
import { AppText } from "./AppText";
import { colors } from "@/theme/tokens";

interface EmptyStateProps {
  title: string;
  description?: string;
  Icon?: LucideIcon;
}

/**
 * Standardized Empty State component to handle "no-data" edge cases gracefully.
 * High-fidelity design with consistent typography and iconography.
 */
export function EmptyState({ title, description, Icon = Info }: EmptyStateProps) {
  return (
    <View className="items-center justify-center p-xl mt-10">
      <View className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900 items-center justify-center mb-md">
        <Icon size={32} color={colors.slate[400]} />
      </View>
      <AppText variant="h3" className="text-center mb-sm">
        {title}
      </AppText>
      {description && (
        <AppText variant="body" className="text-center text-slate-500 dark:text-slate-400">
          {description}
        </AppText>
      )}
    </View>
  );
}
