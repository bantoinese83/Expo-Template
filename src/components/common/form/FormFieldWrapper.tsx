import React from "react";
import { View, Text, ViewStyle, StyleProp } from "react-native";
import { verticalScale } from "@/utils/responsive/metrices";
import ErrorMessage from "../ErrorMessage";

interface FormFieldWrapperProps {
  label?: string;
  error?: string;
  children: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  wrapperStyle?: StyleProp<ViewStyle>;
}

const FormFieldWrapper: React.FC<FormFieldWrapperProps> = ({
  label,
  error,
  children,
  containerStyle,
  wrapperStyle,
}) => {
  return (
    <View className={`mb-[${verticalScale(20)}px]`} style={containerStyle}>
      {label && (
        <Text className="text-[14px] font-medium text-slate-500 dark:text-slate-400 mb-2">
          {label}
        </Text>
      )}
      <View
        className={`w-full h-[52px] px-4 rounded-xl flex-row items-center border bg-slate-50 dark:bg-slate-800 ${
          error ? "border-rose-500" : "border-slate-100 dark:border-slate-700"
        }`}
        style={wrapperStyle}
      >
        {children}
      </View>
      {error && <ErrorMessage message={error} />}
    </View>
  );
};

export default FormFieldWrapper;
