import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants";
import { StatusBar } from "expo-status-bar";
import FormField from "@/components/FormField";
import CustomeButton from "@/components/CustomeButton";
import { Link, router } from "expo-router";

const SignIn = () => {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const onSubmit = () => {
    router.push("/home");
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[90vh] px-4 my-6">
          {/* <Image
            source={images.truck}
            className="h-[84px] w-[130px]"
            resizeMode="contain"
          /> */}
          <Text className="text-white font-psemibold text-xl">
            Log In to TMS Driver
          </Text>

          <View>
            <FormField
              title="Email"
              placeholder="Enter Email"
              value={formValue.email}
              handleChangeText={(e: any) =>
                setFormValue({ ...formValue, email: e })
              }
              otherStyles="mt-7"
            />
            <FormField
              title="Password"
              placeholder="Enter Password"
              value={formValue.password}
              handleChangeText={(e: any) =>
                setFormValue({ ...formValue, password: e })
              }
              otherStyles="mt-7"
            />
          </View>
          <CustomeButton
            buttonStyle="bg-secondary mt-7 w-full"
            textStyle="text-primary"
            title="Sign In"
            handlePress={onSubmit}
            isLoading={false}
          />
          {/* <View className="items-center mt-4 ">
            <Text className="text-white font-psemibold">
              Don't have account?{" "}
              <Link href="/sign-up" className="text-secondary-100">
                Sign Up
              </Link>
            </Text>
          </View> */}
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default SignIn;
