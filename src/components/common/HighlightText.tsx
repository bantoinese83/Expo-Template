import { StyleSheet, Text, View, StyleProp, TextStyle } from "react-native";
import React from "react";
import textStyles from "../../../theme/styles";
import { colors } from "../../../theme/colors";

interface Props {
  text: string;
  style?: StyleProp<TextStyle>;
}

export default function HighlightText({ text, style }: Props) {
  return <Text style={[styles.text, style]}>{text}</Text>;
}

const styles = StyleSheet.create({
  text: {
    ...textStyles.textMedium13,
    color: colors.primary,
  },
});
