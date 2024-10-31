import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

import { ActiveOrders } from "@/shared/models/shipmnet-orders.model";
import { Link, router } from "expo-router";
import { shipments } from "@/mock-data/shipment";
import { useNavigation } from "@react-navigation/native";

import { FontAwesome, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
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
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => router.push("/Detail Order")}
      >
        <View>
          <View>
            <Text className="text-xl px-20">
              {current_orders.pick_up_location}
            </Text>
          </View>
          <View className="items-end">
            <Text className="text-xm font-pregular">
              {shipment.pickupLocations.pickup_date}, {"\n"}
              {shipment.pickupLocations.from}
            </Text>
          </View>
        </View>

        <View style={{ alignItems: "center", marginTop: -50 }}>
          <Image
            source={require("../assets/images/result.png")}
            style={{ height: 80, width: 80 }}
          />
          <Image
            source={require("../assets/images/pngtree.jpg")}
            style={{ width: 38, height: 160 }}
          />
        </View>

        <View>
          <View style={{ paddingLeft: 180, marginTop: -30 }}>
            <Text className="text-xm font-pregular">
              {shipment.pickupLocations.pickup_date}, {"\n"}
              {shipment.pickupLocations.from}
            </Text>
          </View>
          <View>
            <Text className="text-xl px-24">
              {current_orders.drop_of_location}
            </Text>
          </View>
        </View>
        <View className="mb-3 p-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <Text className="text-xs text-gray-500 uppercase tracking-wider">
            Item Description
          </Text>
          <Text className="text-sm text-gray-900 mt-1">
            {shipment.pickupLocations.itemDescription}
          </Text>
          <Text className="text-xs text-gray-500 uppercase tracking-wider mt-2">
            Packaging Type
          </Text>
          <Text className="text-sm text-gray-900 mt-1">
            {shipment.pickupLocations.packagingType}
          </Text>
          <Text className="text-xs text-gray-500 uppercase tracking-wider mt-2">
            Quantity
          </Text>
          <Text className="text-sm text-gray-900 mt-1">
            {shipment.pickupLocations.quantity}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ActiveShipments;
