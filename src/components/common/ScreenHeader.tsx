import { Text, View } from "react-native";
import React from "react";
import { horizontalScale, verticalScale } from "@/utils/responsive/metrices";

interface Props {
  title: string;
  onBackPress?: () => void;
}

export default function ScreenHeader({ title }: Props) {
  return (
    <View
      className={`flex-row justify-between items-center pt-[${verticalScale(25)}px] pb-[${verticalScale(32)}px] px-[${horizontalScale(18)}px]`}
    >
      <View className={`flex-1 pr-[${horizontalScale(30)}px]`}>
        <Text className="text-[15px] font-semibold text-center text-slate-900 dark:text-white">
          {title}
        </Text>
      </View>
    </View>
  );
}
