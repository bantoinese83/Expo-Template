import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Home Stack Navigator to handle UserList navigation
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <View>
      <Text>Home</Text>
    </View>
  </Stack.Navigator>
);
const OrdersScreen = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <View>
      <Text>Orders</Text>
    </View>
  </Stack.Navigator>
);
const AddOrderScreen = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <View>
      <Text>Add Order</Text>
    </View>
  </Stack.Navigator>
);
const Profile = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <View>
      <Text>Scanner</Text>
    </View>
  </Stack.Navigator>
);

const AppTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size, focused }) => {
        if (route.name === "Home") {
          return <MaterialIcons name="home" size={28} color={color} />;
        } else if (route.name === "Orders") {
          return <MaterialIcons name="list-alt" size={28} color={color} />;
        } else if (route.name === "AddOrder") {
          return (
            <MaterialIcons
              name="add-circle"
              size={30}
              color={focused ? "#6A0DAD" : "#ccc"}
            />
          );
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
      component={HomeStack}
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
      component={Profile}
      options={{ tabBarLabel: "Profile", headerShown: false }}
    />
  </Tab.Navigator>
);

export default AppTabs;
