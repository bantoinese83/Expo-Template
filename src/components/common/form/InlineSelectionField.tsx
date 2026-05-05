import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { moderateScale, verticalScale } from "@/utils/responsive/metrices";

type SelectionItem = string | { label: string; value: any };

interface Props {
  label: string;
  options: SelectionItem[];
  selected?: SelectionItem;
  onSelect: (option: SelectionItem) => void;
}

export default function InlineSelectionField({ label, options, selected, onSelect }: Props) {
  const getLabel = (option: SelectionItem | undefined) => {
    if (!option) return "";
    return typeof option === "string" ? option : option.label;
  };

  const getValue = (option: SelectionItem | undefined) => {
    if (!option) return undefined;
    return typeof option === "string" ? option : option.value;
  };

  return (
    <View className={`flex-row items-center mb-[${verticalScale(25)}px]`}>
      <Text className="text-[14px] font-medium text-slate-500 dark:text-slate-400 flex-1">
        {label}
      </Text>
      <View
        className={`h-[${moderateScale(44)}px] rounded-[${moderateScale(5)}px] bg-slate-100 dark:bg-slate-800 flex-row`}
      >
        {options.map((type, index) => {
          const active = getValue(selected) === getValue(type);
          return (
            <TouchableOpacity
              className={`w-[${moderateScale(89)}px] h-[${moderateScale(44)}px] rounded-[${moderateScale(5)}px] justify-center items-center ${
                active ? "bg-indigo-600" : "bg-transparent"
              }`}
              onPress={() => onSelect(type)}
              key={index}
            >
              <Text
                className={`text-[13px] font-normal ${
                  active ? "text-white" : "text-slate-400 dark:text-slate-500"
                }`}
              >
                {getLabel(type)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
