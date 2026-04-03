import { Text, TouchableOpacity, ActivityIndicator, View, ViewStyle, StyleProp } from "react-native";
import React from "react";

interface Props {
  onPress?: () => void;
  title?: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export default function PrimaryButton({
  onPress,
  title,
  className,
  style,
  isLoading = false,
  icon,
  disabled,
}: Props) {
  return (
    <TouchableOpacity
      className={`w-full h-12 rounded-xl bg-indigo-600 justify-center items-center flex-row ${
        isLoading || disabled ? "opacity-60" : ""
      } ${className}`}
      style={style}
      onPress={onPress}
      disabled={isLoading || disabled}
      activeOpacity={0.8}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <View className="flex-row items-center justify-center">
          {icon && <View className="mr-2">{icon}</View>}
          <Text className="text-white font-medium text-sm">{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
