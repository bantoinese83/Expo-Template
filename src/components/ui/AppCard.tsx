import React from "react";
import { View, ViewProps } from "react-native";

interface AppCardProps extends ViewProps {
  padding?: "none" | "sm" | "md" | "lg";
  variant?: "elevated" | "flat" | "outline";
  className?: string;
}

export const AppCard: React.FC<AppCardProps> = ({
  padding = "md",
  variant = "elevated",
  className = "",
  children,
  ...props
}) => {
  const paddingStyles = {
    none: "p-0",
    sm: "p-2",
    md: "p-4",
    lg: "p-6",
  };

  const variantStyles = {
    elevated: "bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800",
    flat: "bg-slate-50 dark:bg-slate-800",
    outline: "bg-transparent border border-slate-200 dark:border-slate-700",
  };

  return (
    <View
      className={`rounded-2xl ${paddingStyles[padding]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </View>
  );
};
