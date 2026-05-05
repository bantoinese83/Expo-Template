import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/responsive/metrices";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface Props {
  title: string;
}

export default function InnerScreenHeader({ title }: Props) {
  const router = useRouter();

  return (
    <View
      className={`flex-row justify-between items-center pt-[${verticalScale(25)}px] pb-[${verticalScale(32)}px] px-[${horizontalScale(18)}px]`}
    >
      <TouchableOpacity
        className={`w-[${moderateScale(30)}px] h-[${moderateScale(30)}px] rounded-[${moderateScale(5)}px] bg-slate-100 dark:bg-slate-800 items-center justify-center`}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={18} className="text-slate-900 dark:text-white" />
      </TouchableOpacity>

      <View className={`flex-1 pr-[${horizontalScale(30)}px]`}>
        <Text className="text-[15px] font-semibold text-center text-slate-900 dark:text-white">
          {title}
        </Text>
      </View>
    </View>
  );
}
