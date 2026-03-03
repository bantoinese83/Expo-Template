import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PrimaryButton from "./src/components/common/PrimaryButton";
import PageHeader from "./src/components/PageHeader";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      <PageHeader
        title="Home"
        showBackButton={false}
        backgroundColor="#A020EF"
      />
      <PrimaryButton title="Click Me" onPress={() => alert("Button Pressed!")}>
        Click
      </PrimaryButton>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
