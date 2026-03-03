import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PrimaryButton from "./src/components/common/PrimaryButton";
import PageHeader from "./src/components/PageHeader";
import { NavigationContainer } from "@react-navigation/native";
import AppHeader from "./src/components/AppHeader";

export default function App() {
  return (
    <NavigationContainer>
      <AppHeader
        userName={"Baheer"}
        userImage={
          "https://img.freepik.com/premium-vector/person-with-blue-shirt-that-says-name-person_1029948-7040.jpg"
        }
        onNotificationPress={() => alert("Notifications Pressed")}
        greeting="Assalam o Alaikum 👋"
        notificationCount={notifications} // Shows red badge with "5"
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
