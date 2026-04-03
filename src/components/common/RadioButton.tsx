import { TouchableOpacity, View } from "react-native";
import React from "react";
import { moderateScale } from "../../../utils/responsive/metrices";

interface Props {
  checked?: boolean;
  toggleRadioButton: () => void;
}

export default function RadioButton({ checked = false, toggleRadioButton }: Props) {
  return (
    <TouchableOpacity
      className={`w-[${moderateScale(14)}px] h-[${moderateScale(14)}px] rounded-full border-2 items-center justify-center opacity-70 ${
        checked ? "border-indigo-600" : "border-slate-900 dark:border-slate-100"
      }`}
      onPress={toggleRadioButton}
    >
      {checked && (
        <View
          className={`w-[${moderateScale(6)}px] h-[${moderateScale(6)}px] bg-indigo-600 rounded-full`}
        />
      )}
    </TouchableOpacity>
  );
}
