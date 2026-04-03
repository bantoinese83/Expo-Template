import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OnboardingScreen3 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>OnboardingScreen3 Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default OnboardingScreen3;
