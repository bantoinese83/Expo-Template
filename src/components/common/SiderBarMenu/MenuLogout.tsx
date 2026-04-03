import { Text, View, TouchableOpacity } from "react-native";
import React, { memo } from "react";
import { horizontalScale, moderateScale } from "../../../../utils/responsive/metrices";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface Props {
  onLogout: () => void;
}

const MenuLogout = ({ onLogout }: Props) => {
  return (
    <TouchableOpacity
      className={`flex-row items-center justify-between gap-[${horizontalScale(8)}px] h-[${moderateScale(38)}px]`}
      onPress={onLogout}
    >
      <View className="flex-row items-center gap-2">
        <MaterialCommunityIcons name="logout" size={16} color="#f43f5e" />
        <Text className="text-[13px] font-normal text-slate-600 dark:text-slate-400">Log Out</Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(MenuLogout);
