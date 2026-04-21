import React from "react";
import { Text, TextProps } from "react-native";

interface AppTextProps extends TextProps {
  variant?: "h1" | "h2" | "h3" | "body" | "caption";
  className?: string;
}

export const AppText: React.FC<AppTextProps> = ({
  variant = "body",
  className = "",
  style,
  children,
  ...props
}) => {
  const variantStyles = {
    h1: "text-4xl font-bold text-slate-950 dark:text-slate-50",
    h2: "text-3xl font-semibold text-slate-900 dark:text-slate-100",
    h3: "text-2xl font-medium text-slate-800 dark:text-slate-200",
    body: "text-base text-slate-600 dark:text-slate-400",
    caption: "text-sm text-slate-500 dark:text-slate-600",
  };

  // Maps variants to accessibility roles
  const accessibilityRoles: Record<string, any> = {
    h1: "header",
    h2: "header",
    h3: "header",
    body: "text",
    caption: "text",
  };

  return (
    <Text
      className={`${variantStyles[variant]} ${className}`}
      style={style}
      accessibilityRole={accessibilityRoles[variant]}
      {...props}
    >
      {children}
    </Text>
  );
};
