import React, { useEffect, useRef } from "react";
import { View, ViewStyle, StyleProp, Animated } from "react-native";
import { useTheme } from "../../hooks/useTheme";

interface AppSkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export const AppSkeleton: React.FC<AppSkeletonProps> = ({
  width = "100%",
  height = 20,
  borderRadius = 8,
  style,
  containerStyle,
}) => {
  const { isDark } = useTheme();
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const baseColor = isDark ? "#1e293b" : "#f1f5f9"; // slate-800 or slate-100

  return (
    <View style={[{ marginVertical: 4 }, containerStyle]}>
      <Animated.View
        style={[
          {
            width: width as any,
            height: height as any,
            borderRadius: borderRadius,
            backgroundColor: baseColor,
            opacity,
          },
          style,
        ]}
      />
    </View>
  );
};

export const AppCardSkeleton = () => (
  <View className="mb-4 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
    <AppSkeleton width="60%" height={20} borderRadius={4} />
    <View className="mt-2" />
    <AppSkeleton width="40%" height={14} borderRadius={4} />
  </View>
);
