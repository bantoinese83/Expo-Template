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
    h1: "text-3xl font-bold text-slate-900",
    h2: "text-2xl font-semibold text-slate-800",
    h3: "text-xl font-medium text-slate-800",
    body: "text-base text-slate-600",
    caption: "text-sm text-slate-400",
  };

  return (
    <Text className={`${variantStyles[variant]} ${className}`} style={style} {...props}>
      {children}
    </Text>
  );
};
