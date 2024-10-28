import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import CustomeButton from "./CustomeButton";
import { ActiveOrders } from "@/shared/models/shipmnet-orders.model";
import { Link, router } from "expo-router";

const ActiveShipments = ({
  current_orders,
}: {
  current_orders: ActiveOrders;
}) => {
  return (
    <View className="space-y-4 my-3 border-b border-b-gray-100">
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => router.push(`/order/${current_orders.id}`)}
      >
        <View className=" flex flex-row justify-between ">
          <View>
            <Text className="text-xs font-pregular">Start and end time</Text>
            <Text className="text-xl font-pregular">
              {current_orders.start_time} {" - "} {current_orders.end_time}
            </Text>
          </View>
          <View>
            <Text className="text-xs font-pregular">Pay</Text>
            <Text className="text-xl font-pregular">$64</Text>
          </View>
        </View>
        <View>
          <Text className="text-xs font-pregular">
            Location and other information
          </Text>
          <Text className="text-xl font-pregular">
            {current_orders.pick_up_location}
          </Text>
          <Text className="text-xl font-pregular">
            {current_orders.drop_of_location}
          </Text>
        </View>
      </TouchableOpacity>
      <CustomeButton
        buttonStyle="w-full bg-secondary my-4"
        textStyle="font-pregular text-center"
        title="GO TO START LOCATION"
        handlePress={() => {
          router.push(`/order/${current_orders.id}`);
        }}
        isLoading={false}
      />
    </View>
  );
};

export default ActiveShipments;
