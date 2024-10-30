// export default detailorder;
import ActiveShipments from "@/components/ActiveShipments";
import { View, Text } from "react-native";
import React from "react";
import { shipments } from "@/mock-data/shipment";

const DetailOrder = () => {
  const shipment = shipments[0];

  return (
    <View className="bg-white p-6 rounded-2xl mt-6 shadow-lg border border-gray-200">
      {/* Contact Person Section */}
      <View className="mb-5">
        <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Contact Person Name
        </Text>
        <Text className="text-lg font-bold text-gray-900 mt-1">
          {shipment.pickupLocations.contact_person.full_name}
        </Text>
      </View>

      {/* Contact Phone Number */}
      <View className="mb-5">
        <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Contact Person Phone Number
        </Text>
        <Text className="text-lg font-bold text-gray-900 mt-1">
          {shipment.pickupLocations.contact_person.phone_number}
        </Text>
      </View>

      {/* Item Description */}
      <View className="mb-5">
        <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Item Description
        </Text>
        <Text className="text-lg font-bold text-gray-900 mt-1">
          {shipment.pickupLocations.itemDescription}
        </Text>
      </View>

      {/* Quantity */}
      <View className="mb-5">
        <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Quantity
        </Text>
        <Text className="text-lg font-bold text-gray-900 mt-1">
          {shipment.pickupLocations.quantity}
        </Text>
      </View>

      {/* Receiver Name */}
      <View className="mb-5">
        <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Receiver Name
        </Text>
        <Text className="text-lg font-bold text-gray-900 mt-1">
          {shipment.pickupLocations.receiver.full_name}
        </Text>
      </View>

      {/* Receiver Phone Number */}
      <View className="mb-5">
        <Text className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Receiver Phone Number
        </Text>
        <Text className="text-lg font-bold text-gray-900 mt-1">
          {shipment.pickupLocations.receiver.phone_number}
        </Text>
      </View>
    </View>
  );
};

export default DetailOrder;
