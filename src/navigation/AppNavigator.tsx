import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AppTabs from "./AppTabs";

export type RootStackParamList = {
  Main: undefined;
  Tabs: { screen: string };
  Auth: { screen: string };
  NormalStack: { screen: string };
  Notifications: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={AppTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
