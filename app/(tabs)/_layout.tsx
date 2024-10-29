import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet } from "react-native";
import { usePathname } from "expo-router";
import HomeScreen from "./home"; // Import your screens
import ProfileScreen from "./profile";
import Handoff from "./handoff";

// Define types for Tab Navigator
type TabParamList = {
  Home: undefined;
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
          let iconName: keyof typeof Ionicons.glyphMap;
          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Handoff") {
            iconName = "swap-horizontal-outline"; // Choose an icon for Handoff
          } else if (route.name === "Profile") {
            iconName = "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#5363df",
        tabBarInactiveTintColor: "#000",
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarStyle: { backgroundColor: "#fff", paddingBottom: 5 },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
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
