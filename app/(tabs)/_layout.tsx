// 'use cient'
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { router, usePathname } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { images } from "@/constants";
import { Ionicons } from "@expo/vector-icons";

const CustomDrawerContent = (props: any) => {
  const { top, bottom } = useSafeAreaInsets();
  const pathname = usePathname();
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        // contentContainerStyle={{ backgroundColor: "#dde3fe" }}
      >
        <View className="justify-center items-center mt-10">
          <Image
            source={images.profile}
            className="w-28 h-28 rounded-full"
            resizeMode="contain"
          />
          <Text>Gemechu</Text>
        </View>

        {/* to list all the files on the drawer */}
        {/* <DrawerItemList {...props} /> */}

        {/* define all route  */}

        <DrawerItem
          icon={({ color, size }) => (
            <Ionicons
              name="home-outline"
              size={size}
              color={pathname === "/home" ? "#fff" : "#000"}
            />
          )}
          label="Home"
          labelStyle={[
            labelStyle.navbarItemLable,
            { color: pathname == "/home" ? "#fff" : "#000" },
          ]}
          style={{ backgroundColor: pathname == "/home" ? "#333" : "#fff" }}
          onPress={() => router.push("/home")}
        />

        <DrawerItem
          icon={({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          )}
          label={"Logout"}
          labelStyle={labelStyle.navbarItemLable}
          onPress={() => router.push("/")}
        />
      </DrawerContentScrollView>

      <View className={`border-t border-t-gray-100 p-2 pb-5`}>
        <Text>Footer</Text>
      </View>
    </View>
  );
};

export default function TabLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* custome drawer  */}

      <Drawer drawerContent={CustomDrawerContent} />
      {/* default drawer */}

      {/* <Drawer
        screenOptions={{
          drawerHideStatusBarOnOpen: true,
          drawerActiveBackgroundColor: "#5363df",
          drawerActiveTintColor: "#fff",
          drawerLabelStyle: { marginLeft: 2 },
        }}
      >
      <Drawer.Screen
          name="home"
          options={{
            drawerLabel: "Home",
            title: "Home",
            headerShown: true,
            headerTitleAlign: "center",
            // headerStyle: {
            //   backgroundColor: "blue",
            // },
            // headerTitleStyle: {
            //   fontWeight: "bold",
            //   fontSize: 24,
            //   color: "#fff",
            // },
          }}
        />
        <Drawer.Screen
          name="profile"
          options={{
            drawerLabel: "Profile",
            title: "profile",
          }}
        />
      </Drawer> */}
    </GestureHandlerRootView>
  );
}

const labelStyle = StyleSheet.create({
  navbarItemLable: {
    marginLeft: -20,
  },
});
