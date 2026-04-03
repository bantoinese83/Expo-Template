import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface Props {
  label: string;
  selected: boolean;
  onSelect: (selected: boolean) => void;
}

const CustomRadioButton: React.FC<Props> = ({ label, selected, onSelect }) => {
  return (
    <TouchableOpacity onPress={() => onSelect(!selected)} className="flex-row items-center">
      <View className="h-[17px] w-[17px] rounded-full border-2 border-indigo-600 items-center justify-center mr-2">
        {selected && <View className="h-2 w-2 rounded-full bg-indigo-600" />}
      </View>
      <Text className="text-slate-900 dark:text-slate-100">{label}</Text>
    </TouchableOpacity>
  );
};

export default CustomRadioButton;
