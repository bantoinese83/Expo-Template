import React from "react";
import { View, StyleSheet, ActivityIndicator, Dimensions } from "react-native";

interface Props {
  isLoading?: boolean;
  color?: string;
}

const Loader: React.FC<Props> = ({ color = "white", isLoading = true }) => {
  if (!isLoading) return null;
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: -10,
    right: -10,
    bottom: -10,
    left: -10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: 9999,
  },
});

export default Loader;
