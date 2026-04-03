import { TextInput, TouchableOpacity, TextInputProps, ViewStyle } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import FormFieldWrapper from "./FormFieldWrapper";

interface Props extends TextInputProps {
  label: string;
  onTextChange: (text: string) => void;
  error?: string;
  containerStyle?: ViewStyle;
}

export default function PasswordField(props: Props) {
  const { label, placeholder, value, onTextChange, error, containerStyle, ...rest } = props;
  const [show, setShow] = useState<boolean>(false);

  return (
    <FormFieldWrapper label={label} error={error} containerStyle={containerStyle}>
      <TextInput
        textContentType="password"
        placeholder={placeholder}
        secureTextEntry={!show}
        value={value}
        onChangeText={onTextChange}
        className="flex-1 h-full bg-transparent text-slate-800 dark:text-slate-100 text-[14px] font-normal"
        placeholderTextColor="#94a3b8"
        {...rest}
      />
      <TouchableOpacity onPress={() => setShow(!show)} className="p-2">
        <Feather
          name={show ? "eye" : "eye-off"}
          size={16}
          color="#475569"
          className="dark:text-slate-400"
        />
      </TouchableOpacity>
    </FormFieldWrapper>
  );
}
