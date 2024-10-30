import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import { ActiveOrders } from "@/shared/models/shipmnet-orders.model";
import { Link, router } from "expo-router";
import { shipments } from "@/mock-data/shipment";
import { useNavigation } from "@react-navigation/native";

import { FontAwesome } from "@expo/vector-icons";
import DropDownPicker from "react-native-dropdown-picker";

interface ActiveShipmentsProps {
  current_orders: ActiveOrders;
  dropOfLocation: string; // Add this prop
  setDropOfLocation: (value: string) => void; // Add this prop
}
const ActiveShipments: React.FC<ActiveShipmentsProps> = ({
  current_orders,
  dropOfLocation,
  setDropOfLocation,
}) => {
  const [open, setOpen] = React.useState<boolean>(false); // Controls dropdown visibility
  const shipment = shipments[0];
  return (
    <View style={{ padding: 16 }}>
      {/* Outer padding for spacing */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => router.push("/Detail Order")}
      >
        {/* Pickup Location Section */}
        <View className="flex flex-row justify-center mb-2">
          <View>
            <Text className="text-xs  ">Pickup Location</Text>
            <Text className="text-xl px-8">
              {current_orders.pick_up_location}
            </Text>
            <Text className="text-xl font-pregular">
              {shipment.pickupLocations.pickup_date}, {"\t"}
              {shipment.pickupLocations.from}
            </Text>
          </View>
        </View>

        {/* Directional Arrow */}
        <View className="items-center my-2 mt-5">
          <FontAwesome name="long-arrow-down" size={100} color="orange" />
        </View>

        {/* Dropoff Location Section with Dropdown */}
        <View className="flex flex-row justify-center mt-2">
          <View>
            <Text className="text-xs font-pregular ml-10 mt-3 ">
              Dropoff Location
            </Text>

            {/* Display the selected drop-off location */}
            <Text className="text-xl font-pregular ml-20">
              {dropOfLocation}
            </Text>
            <Text className="text-xl font-pregular ml-10">
              {shipment.pickupLocations.delivery_date}, {"\t"}
              {shipment.pickupLocations.from}
            </Text>
            <DropDownPicker
              open={open}
              setOpen={setOpen}
              value={dropOfLocation}
              setValue={setDropOfLocation} // Update dropOfLocation state in Home
              items={[
                {
                  label: "DEBREZEYET",
                  value: "DEBREZEYET",
                },
                {
                  label: "MOJO",
                  value: "MOJO",
                },
                { label: "ADAMA", value: "ADAMA" },
                // Add more options as needed
              ]}
              style={{ marginTop: 8, backgroundColor: "#f9f9f9" }}
              dropDownContainerStyle={{ backgroundColor: "#f1f1f1" }}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ActiveShipments;
