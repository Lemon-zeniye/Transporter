import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import Order from "./home";
import ProfileScreen from "./profile";
import Handoff from "./handoff";
import Active from "./status";

type TabParamList = {
  Order: undefined;
  Profile: undefined;
  Handoff: undefined;
  Active: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
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
        },
        tabBarActiveTintColor: "#5363df",
        tabBarInactiveTintColor: "#000",
        tabBarLabelStyle: styles.tabBarLabel,
<<<<<<< HEAD
        tabBarStyle: {
          backgroundColor: "#fff",
          paddingBottom: 5,
          height: 60, // Set a specific height
          paddingTop: 5,
        },
=======
>>>>>>> 1e0e229f05b946537bb868ee8aab648cda8a7966
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
    fontSize: 15,
    marginBottom: 3,
  },
});
