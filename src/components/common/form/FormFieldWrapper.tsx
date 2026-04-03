import React from "react";
import { View, Text, ViewStyle, StyleProp } from "react-native";
import { colors } from "../../../../theme/colors";
import textStyles, { commonStyles } from "../../../../theme/styles";
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
    <View style={[commonStyles.formContainer, containerStyle]}>
      {label && (
        <Text style={{ ...textStyles.textMedium14, color: colors.darkGray }}>
          {label}
        </Text>
      )}
      <View
        style={[
          commonStyles.inputWrapper,
          { borderColor: error ? colors.danger : "transparent" },
          wrapperStyle,
        ]}
      >
        {children}
      </View>
      {error && <ErrorMessage message={error} />}
    </View>
  );
};

export default FormFieldWrapper;
