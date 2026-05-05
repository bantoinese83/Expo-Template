import React, { useEffect } from "react";
import { View, ViewStyle, StyleProp } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  interpolate,
} from "react-native-reanimated";
import { useTheme } from "../../hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";

interface AppSkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export const AppSkeleton: React.FC<AppSkeletonProps> = ({
  width = "100%",
  height = 20,
  borderRadius = 12,
  style,
  containerStyle,
}) => {
  const { isDark } = useTheme();
  const shimmer = useSharedValue(0);

  useEffect(() => {
    shimmer.value = withRepeat(withTiming(1, { duration: 1500 }), -1, false);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(shimmer.value, [0, 1], [-width as any, width as any]);
    return {
      transform: [{ translateX }],
    };
  });

  const baseColor = isDark ? "#1e293b" : "#f1f5f9";
  const highlightColor = isDark ? "#334155" : "#ffffff";

  return (
    <View
      style={[
        {
          width: width as any,
          height: height as any,
          borderRadius: borderRadius,
          backgroundColor: baseColor,
          overflow: "hidden",
          marginVertical: 4,
        },
        containerStyle,
        style,
      ]}
    >
      <AnimatedLinearGradient
        colors={[baseColor, highlightColor, baseColor]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[{ width: "100%", height: "100%" }, animatedStyle]}
      />
    </View>
  );
};

export const AppCardSkeleton = () => (
  <View className="mb-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-50 dark:border-slate-800 shadow-sm">
    <AppSkeleton width="40%" height={24} borderRadius={8} />
    <View className="mt-4" />
    <AppSkeleton width="85%" height={16} borderRadius={6} />
    <AppSkeleton width="60%" height={16} borderRadius={6} containerStyle={{ marginTop: 8 }} />
  </View>
);
