import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import CustomeButton from "@/components/CustomeButton";
import { StatusBar } from "expo-status-bar";
import { Link, Redirect, router } from "expo-router";
import SignIn from "./(auth)/sign-in";

const App = () => {
  return <SignIn />;
};

export default App;
