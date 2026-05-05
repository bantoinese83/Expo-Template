import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { horizontalScale, moderateScale, verticalScale } from "@/utils/responsive/metrices";

type SelectionItem = string | { label: string; value: any };

interface Props {
  label: string;
  options: SelectionItem[];
  selected?: SelectionItem;
  onSelect: (option: SelectionItem) => void;
}

export default function SelectionField({ label, options, selected, onSelect }: Props) {
  const getLabel = (option: SelectionItem | undefined) => {
    if (!option) return "";
    return typeof option === "string" ? option : option.label;
  };

  const getValue = (option: SelectionItem | undefined) => {
    if (!option) return undefined;
    return typeof option === "string" ? option : option.value;
  };

  return (
    <View className={`mb-[${verticalScale(25)}px]`}>
      <Text className="text-[14px] font-medium text-slate-500 dark:text-slate-400">{label}</Text>
      <ScrollView
        className={`mt-[${verticalScale(10)}px]`}
        contentContainerStyle={{
          height: moderateScale(44),
          flexDirection: "row",
        }}
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        {options?.map((type, index) => {
          const active = getValue(selected) === getValue(type);
          return (
            <TouchableOpacity
              className={`w-[${moderateScale(168)}px] h-[${moderateScale(44)}px] rounded-[${moderateScale(5)}px] mr-[${horizontalScale(10)}px] justify-center items-center ${
                active ? "bg-indigo-600" : "bg-slate-50 dark:bg-slate-800"
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
      </ScrollView>
    </View>
  );
}
