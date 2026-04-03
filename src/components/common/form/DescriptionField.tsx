import { Text, TextInput, View } from "react-native";
import React from "react";
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from "../../../../utils/responsive/metrices";
import ErrorMessage from "../ErrorMessage";

interface Props {
  style?: object;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (text: string) => void;
  error?: string;
  rows?: number;
  [key: string]: any;
}

export default function DescriptionField({
  style,
  label,
  placeholder,
  value,
  onChange,
  error,
  rows,
  ...rest
}: Props) {
  return (
    <View className={`mb-[${verticalScale(20)}px]`} style={style}>
      <Text className="text-[14px] font-medium text-slate-500 dark:text-slate-400">{label}</Text>
      <View
        className={`w-full py-[${verticalScale(15)}px] px-[${horizontalScale(16)}px] rounded-[${moderateScale(12)}px] bg-slate-50 dark:bg-slate-800 mt-[${verticalScale(8)}px] mb-[${verticalScale(5)}px]`}
      >
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={(text: string) => onChange(text)}
          className="flex-1 bg-transparent text-slate-900 dark:text-slate-100 text-[13px] font-normal"
          style={{ textAlignVertical: "top" }}
          placeholderTextColor="#94a3b8"
          multiline={true}
          numberOfLines={rows ? rows : 5}
          {...rest}
        />
      </View>
      {error && <ErrorMessage message={error} />}
    </View>
  );
}
