import { StyleSheet, TextInput, TextInputProps, ViewStyle } from "react-native";
import React from "react";
import { colors } from "../../../../theme/colors";
import textStyles from "../../../../theme/styles";
import FormFieldWrapper from "./FormFieldWrapper";

interface Props extends TextInputProps {
  containerStyle?: ViewStyle;
  label?: string;
  onTextChange: (text: string) => void;
  error?: string;
}

export default function TextField(props: Props) {
  const { containerStyle, label, placeholder, value, onTextChange, error, ...rest } = props;
  return (
    <FormFieldWrapper label={label} error={error} containerStyle={containerStyle}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onTextChange}
        style={styles.input}
        placeholderTextColor={colors.lightGray}
        {...rest}
      />
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
