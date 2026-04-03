import React from "react";
import { View, Text, StyleSheet } from "react-native";

const OnboardingScreen1 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>OnboardingScreen1 Screen</Text>
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

export default OnboardingScreen1;
