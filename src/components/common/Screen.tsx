import { SafeAreaView, StatusBar, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { colors } from "../../../theme/colors";

interface Props {
  children?: React.ReactNode;
  style?: ViewStyle | any;
}

export default function Screen({ style, children }: Props) {
  return <SafeAreaView style={{ ...styles.container, ...style }}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: colors.white,
  },
});
