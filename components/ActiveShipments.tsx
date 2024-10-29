import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CustomButton from "./CustomButton";
import { ActiveOrders } from "@/shared/models/shipmnet-orders.model";
import { router } from "expo-router";
import { shipments } from "@/mock-data/shipment";

const ActiveShipments = ({
  current_orders,
}: {
  current_orders: ActiveOrders;
}) => {
  const [isCardVisible, setIsCardVisible] = useState(false);

  const toggleCardVisibility = () => {
    setIsCardVisible(!isCardVisible);
  };

  const shipment = shipments[0];

  return (
    <View>
      <TouchableOpacity activeOpacity={0.7} onPress={toggleCardVisibility}>
        <View className="flex flex-row justify-between">
          <View>
            <Text className="text-xs">Pickup Date</Text>
            <Text className="text-xl">{current_orders.pickup_date}</Text>
            <Text className="text-xs font-pregular">Pickup Time</Text>
            <Text className="text-xl font-pregular">
              {current_orders.start_time} {" - "} {current_orders.end_time}
            </Text>
          </View>
        </View>
        <View>
          <Text className="text-xs font-pregular">Pickup Location</Text>
          <Text className="text-xl font-pregular">
            {current_orders.pick_up_location}
          </Text>
          <Text className="text-xs font-pregular">Dropoff Location</Text>
          <Text className="text-xl font-pregular">
            {current_orders.drop_of_location}
          </Text>
        </View>
      </TouchableOpacity>

      {isCardVisible && (
        <View className="bg-gray rounded-md mt-5">
          <Text className="text-xs font-pregular">Contact Person Name</Text>
          <Text className="text-xl font-pregular">
            {shipment.pickupLocations.contact_person.full_name}
          </Text>
          <Text className="text-xs font-pregular">
            Contact Person Phone Number
          </Text>
          <Text className="text-xl font-pregular">
            {shipment.pickupLocations.contact_person.phone_number}
          </Text>
          <Text className="text-xs font-pregular">Item Description</Text>
          <Text className="text-xl font-pregular">
            {shipment.pickupLocations.itemDescription}
          </Text>
          <Text className="text-xs font-pregular">Quantity</Text>
          <Text className="text-xl font-pregular">
            {shipment.pickupLocations.quantity}
          </Text>
          <Text className="text-xs font-pregular">Receiver Name</Text>
          <Text className="text-xl font-pregular">
            {shipment.pickupLocations.receiver.full_name}
          </Text>
          <Text className="text-xs font-pregular">Receiver Phone Number</Text>
          <Text className="text-xl font-pregular">
            {shipment.pickupLocations.receiver.phone_number}
          </Text>
        </View>
      )}

      <CustomButton
        buttonStyle="w-full bg-secondary my-4"
        textStyle="font-pregular text-center"
        title="ACCEPT ORDER"
        handlePress={() => {
          router.push("/(tabs)status");
        }}
        isLoading={false}
      />
    </View>
  );
};

export default ActiveShipments;
