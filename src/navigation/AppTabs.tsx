import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import HomeScreen from "../screens/tabs/HomeScreen";
import OrdersScreen from "../screens/tabs/OrdersScreen";
import AddOrderScreen from "../screens/tabs/AddOrderScreen";
import ProfileScreen from "../screens/tabs/ProfileScreen";
import CustomersScreen from "../screens/tabs/CustomersScreen";

export type AppTabsParamList = {
  Home: undefined;
  Orders: undefined;
  AddOrder: undefined;
  Profile: undefined;
  Customers: undefined;
};

const Tab = createBottomTabNavigator<AppTabsParamList>();

const AppTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size, focused }) => {
        if (route.name === "Home") {
          return <MaterialIcons name="home" size={28} color={color} />;
        } else if (route.name === "Orders") {
          return <MaterialIcons name="list-alt" size={28} color={color} />;
        } else if (route.name === "AddOrder") {
          return <MaterialIcons name="add-circle" size={30} color={focused ? "#6A0DAD" : "#ccc"} />;
        } else if (route.name === "Customers") {
          return <MaterialIcons name="people" size={28} color={color} />;
        } else if (route.name === "Profile") {
          return <FontAwesome name="user" size={28} color={color} />;
        }
        return null;
      },
      tabBarActiveTintColor: "#6A0DAD",
      tabBarInactiveTintColor: "gray",
    })}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{ tabBarLabel: "Home", headerShown: false }}
    />
    <Tab.Screen
      name="Orders"
      component={OrdersScreen}
      options={{ tabBarLabel: "Orders", headerShown: false }}
    />

    <Tab.Screen
      name="AddOrder"
      component={AddOrderScreen}
      options={{ tabBarLabel: "", headerShown: false }}
    />

    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{ tabBarLabel: "Profile", headerShown: false }}
    />
  </Tab.Navigator>
);

export default AppTabs;
