import React from "react";
import { View, ViewProps } from "react-native";
import { Skeleton as MotiSkeleton } from "moti/skeleton";

interface SkeletonProps extends ViewProps {
  width?: number | `${number}%`;
  height?: number | `${number}%`;
  radius?: number | "round";
  show?: boolean;
  colorMode?: "light" | "dark";
  children?: React.ReactElement | null;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = 20,
  radius = 8,
  show = true,
  colorMode = "light",
  children,
}) => {
  return (
    <MotiSkeleton
      show={show}
      radius={radius}
      height={height as any}
      width={width as any}
      colorMode={colorMode}
      transition={{
        type: "timing",
        duration: 1500,
      }}
    >
      {children}
    </MotiSkeleton>
  );
};

export const AppSkeleton = {
  Card: () => (
    <View className="w-full p-4 bg-white dark:bg-slate-900 rounded-2xl mb-4 border border-slate-100 dark:border-slate-800">
      <Skeleton height={20} width="60%" radius={4} />
      <View className="mt-2" />
      <Skeleton height={14} width="40%" radius={4} />
    </View>
  ),
  Header: () => (
    <View className="flex-row justify-between items-center px-4 pt-10 pb-3">
      <View className="flex-row items-center">
        <Skeleton height={32} width={32} radius={8} />
        <View className="ml-3">
          <Skeleton height={16} width={100} radius={4} />
          <View className="mt-1" />
          <Skeleton height={12} width={60} radius={4} />
        </View>
      </View>
      <Skeleton height={28} width={28} radius={14} />
    </View>
  ),
};
