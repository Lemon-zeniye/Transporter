import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
  FontAwesome6,
} from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import { usePathname } from "expo-router";
import Order from "./home"; // Import your screens
import ProfileScreen from "./profile";
import Handoff from "./handoff";
import Active from "./status";

// Define types for Tab Navigator
type TabParamList = {
  Order: undefined;
  Profile: undefined;
  Handoff: undefined;
  Active: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  const pathname = usePathname();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Order") {
            return <FontAwesome6 name="box" color={color} size={size} />;
          } else if (route.name === "Active") {
            return <FontAwesome6 name="box-open" color={color} size={size} />;
          } else if (route.name === "Handoff") {
            return <FontAwesome name="handshake-o" color={color} size={size} />;
          } else if (route.name === "Profile") {
            return <FontAwesome5 name="user" color={color} size={size} />;
          }
          return null;
        },
        tabBarActiveTintColor: "#5363df", // Active color for icon and text
        tabBarInactiveTintColor: "#000", // Inactive color for icon and text
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarStyle: {
          backgroundColor: "#fff",
          paddingBottom: 5,
          height: 60, // Set a specific height
          paddingTop: 5,
        },
      })}
    >
      <Tab.Screen name="Order" component={Order} />
      <Tab.Screen name="Active" component={Active} />
      <Tab.Screen name="Handoff" component={Handoff} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const App: React.FC = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TabNavigator />
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 12,
    marginBottom: 3,
  },
});
