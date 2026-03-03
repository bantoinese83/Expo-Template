import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PrimaryButton from "./src/components/common/PrimaryButton";
import PageHeader from "./src/components/PageHeader";
export default function App() {
  return (
    <View style={styles.container}>
      <PageHeader
        title="Home"
        showBackButton={false}
        backgroundColor="#A020EF"
      />
      <PrimaryButton title="Click Me" onPress={() => alert("Button Pressed!")}>
        Click
      </PrimaryButton>
      <StatusBar style="auto" />
    </View>
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
