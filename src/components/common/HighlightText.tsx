import { Text, StyleProp, TextStyle } from "react-native";
import React from "react";

interface Props {
  text: string;
  style?: StyleProp<TextStyle>;
}

export default function HighlightText({ text, style }: Props) {
  return (
    <Text className="text-indigo-600 dark:text-indigo-400 text-[13px] font-medium" style={style}>
      {text}
    </Text>
  );
}
