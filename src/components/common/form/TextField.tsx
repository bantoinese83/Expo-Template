import { TextInput, TextInputProps, ViewStyle } from "react-native";
import React from "react";
import FormFieldWrapper from "./FormFieldWrapper";

interface Props extends TextInputProps {
  containerStyle?: ViewStyle;
  label?: string;
  onTextChange: (text: string) => void;
  error?: string;
}

export default function TextField(props: Props) {
  const { containerStyle, label, placeholder, value, onTextChange, error, ...rest } = props;
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <FormFieldWrapper
      label={label}
      error={error}
      containerStyle={containerStyle}
      wrapperStyle={{
        borderColor: isFocused ? "#6366f1" : error ? "#f43f5e" : "transparent",
      }}
    >
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onTextChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="flex-1 h-full bg-transparent text-slate-800 dark:text-slate-100 text-[14px] font-normal"
        placeholderTextColor="#94a3b8"
        {...rest}
      />
    </FormFieldWrapper>
  );
}
