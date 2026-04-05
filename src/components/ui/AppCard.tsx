import React from "react";
import { View, ViewProps, Pressable, PressableProps } from "react-native";
import { AppText } from "./AppText";

interface AppCardProps extends ViewProps {
  children: React.ReactNode;
  variant?: "elevated" | "outline" | "ghost";
  padding?: "none" | "sm" | "md" | "lg";
  onPress?: PressableProps["onPress"];
  className?: string;
}

export const AppCard: React.FC<AppCardProps> = React.memo(
  ({ children, variant = "elevated", padding = "md", onPress, className = "", ...props }) => {
    const variants = {
      elevated:
        "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm",
      outline: "bg-transparent border border-slate-200 dark:border-slate-800",
      ghost: "bg-slate-50 dark:bg-slate-900/50",
    };

    const paddings = {
      none: "p-0",
      sm: "p-3",
      md: "p-4",
      lg: "p-6",
    };

    const Container = onPress ? Pressable : (View as any);

    return (
      <Container
        className={`rounded-2xl ${variants[variant]} ${paddings[padding]} ${className}`}
        onPress={onPress}
        {...(onPress ? { android_ripple: { color: "#e2e8f0" } } : {})}
        {...props}
      >
        {children}
      </Container>
    );
  }
);

interface AppCardHeaderProps {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  className?: string;
}

export const AppCardHeader: React.FC<AppCardHeaderProps> = React.memo(
  ({ title, subtitle, right, className = "" }) => (
    <View className={`flex-row justify-between items-center mb-3 ${className}`}>
      <View className="flex-1">
        <AppText variant="h3" className="text-base">
          {title}
        </AppText>
        {subtitle && <AppText variant="caption">{subtitle}</AppText>}
      </View>
      {right && <View className="ml-2">{right}</View>}
    </View>
  )
);
