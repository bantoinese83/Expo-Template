import React from "react";
import { TouchableOpacity, TouchableOpacityProps, ActivityIndicator, View } from "react-native";
import * as Haptics from "expo-haptics";
import { AppText } from "./AppText";

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  haptic?: Haptics.ImpactFeedbackStyle;
  textClassName?: string;
}

export const AppButton: React.FC<AppButtonProps> = ({
  title,
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  rightIcon,
  haptic = Haptics.ImpactFeedbackStyle.Light,
  className = "",
  textClassName = "",
  disabled,
  onPress,
  ...props
}) => {
  const handlePress = (e: any) => {
    if (loading || disabled) return;
    if (haptic) {
      Haptics.impactAsync(haptic);
    }
    if (onPress) {
      onPress(e);
    }
  };

  const variants = {
    primary: "bg-primary active:bg-indigo-700",
    secondary: "bg-slate-200 dark:bg-slate-800 active:bg-slate-300 dark:active:bg-slate-700",
    danger: "bg-danger active:bg-red-600",
    ghost: "bg-transparent active:bg-slate-100 dark:active:bg-slate-900",
    outline:
      "bg-transparent border border-primary active:bg-indigo-50 dark:active:bg-indigo-900/20",
  };

  const textVariants = {
    primary: "text-white font-semibold",
    secondary: "text-slate-900 dark:text-white font-semibold",
    danger: "text-white font-semibold",
    ghost: "text-primary dark:text-indigo-400 font-semibold",
    outline: "text-primary dark:text-indigo-400 font-semibold",
  };

  const sizes = {
    sm: "px-3 py-1.5 rounded-lg",
    md: "px-5 py-3 rounded-xl",
    lg: "px-8 py-4 rounded-2xl",
  };

  const textSizes = {
    sm: "caption",
    md: "body",
    lg: "h3",
  } as const;

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled || loading}
      className={`flex-row items-center justify-center ${variants[variant]} ${sizes[size]} ${
        disabled || loading ? "opacity-50" : ""
      } ${className}`}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "primary" || variant === "danger" ? "white" : "#6366f1"}
          size="small"
        />
      ) : (
        <View className="flex-row items-center justify-center">
          {leftIcon && <View className="mr-2">{leftIcon}</View>}
          <AppText
            variant={textSizes[size]}
            className={`${textVariants[variant]} ${textClassName}`}
          >
            {title}
          </AppText>
          {rightIcon && <View className="ml-2">{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};
