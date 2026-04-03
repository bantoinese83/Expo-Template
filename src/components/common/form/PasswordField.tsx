import { StyleSheet, TextInput, TouchableOpacity, TextInputProps, ViewStyle } from "react-native";
import React, { useState } from "react";
import { colors } from "../../../../theme/colors";
import textStyles from "../../../../theme/styles";
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
        style={styles.input}
        placeholderTextColor={colors.lightGray}
        {...rest}
      />
      <TouchableOpacity onPress={() => setShow(!show)}>
        <Feather name={show ? "eye" : "eye-off"} size={16} color={colors.darkGray} />
      </TouchableOpacity>
    </FormFieldWrapper>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: "100%",
    backgroundColor: "transparent",
    color: colors.darkGray,
    ...textStyles.textRegular14,
  },
});
