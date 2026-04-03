import { View, Text, TouchableOpacity, Platform } from "react-native";
import React, { memo } from "react";
import { moderateScale } from "../../../../utils/responsive/metrices";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  onClose: () => void;
}

const MenuHeader = ({ onClose }: Props) => {
  return (
    <View
      className={`flex-row justify-between items-center ${
        Platform.OS === "ios" ? `mt-[${moderateScale(45)}px]` : ""
      }`}
    >
      <View className="flex-row items-center">
        <View className="w-8 h-8 bg-indigo-600 rounded-lg items-center justify-center mr-2">
          <Text className="text-white font-bold text-lg">E</Text>
        </View>
        <Text className="text-lg font-bold text-slate-900 dark:text-white">Expo Template</Text>
      </View>
      <TouchableOpacity onPress={onClose} className="p-1">
        <Ionicons name="close" size={24} color="#f43f5e" />
      </TouchableOpacity>
    </View>
  );
};

export default memo(MenuHeader);
