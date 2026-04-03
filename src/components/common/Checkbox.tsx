import { TouchableOpacity } from "react-native";
import React from "react";
import { moderateScale } from "../../../utils/responsive/metrices";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
  checked?: boolean;
  toggleCheckbox: () => void;
}

export default function Checkbox({ checked = false, toggleCheckbox }: Props) {
  return (
    <TouchableOpacity
      className={`w-[${moderateScale(17)}px] h-[${moderateScale(17)}px] rounded-[${moderateScale(
        4
      )}px] border-[1.5px] items-center justify-center opacity-70 ${
        checked ? "border-indigo-600 bg-indigo-600" : "border-[#C4C4C4] bg-white dark:bg-slate-800"
      }`}
      onPress={toggleCheckbox}
    >
      {checked && <FontAwesome name="check" size={11} color="white" />}
    </TouchableOpacity>
  );
}
