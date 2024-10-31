// export default detailorder;
import ActiveShipments from "@/components/ActiveShipments";
import { View, Text } from "react-native";
import React from "react";
import { shipments } from "@/mock-data/shipment";

const DetailOrder = () => {
  const shipment = shipments[0];

  return (
    <View className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
      {/* Shipment Number */}
      <View className="mb-4">
        <Text className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Shipment Number
        </Text>
        <Text className="text-lg font-bold text-gray-800 mt-1">
          {shipment.shipmentNumber}
        </Text>
      </View>

      {/* Item Description */}
      <View className="mb-4">
        <Text className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Item Description
        </Text>
        <Text className="text-lg font-bold text-gray-800 mt-1">
          {shipment.pickupLocations.itemDescription}
        </Text>
      </View>

      {/* Item Category */}
      <View className="mb-4">
        <Text className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Item Category
        </Text>
        <Text className="text-lg font-bold text-gray-800 mt-1">
          {shipment.pickupLocations.itemCategory}
        </Text>
      </View>

      {/* Quantity */}
      <View className="mb-4">
        <Text className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Quantity
        </Text>
        <Text className="text-lg font-bold text-gray-800 mt-1">
          {shipment.pickupLocations.quantity}
        </Text>
      </View>

      {/* Contact Person */}
      <View className="mb-4">
        <Text className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Full Name
        </Text>
        <Text className="text-lg font-bold text-gray-800 mt-1">
          {shipment.pickupLocations.contact_person.full_name}
        </Text>
      </View>

      {/* Contact Person Phone Number */}
      <View className="mb-4">
        <Text className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Contact Person Phone Number
        </Text>
        <Text className="text-lg font-bold text-gray-800 mt-1">
          {shipment.pickupLocations.contact_person.phone_number}
        </Text>
      </View>

      {/* Email */}
      <View className="mb-4">
        <Text className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Email
        </Text>
        <Text className="text-lg font-bold text-gray-800 mt-1">
          {shipment.pickupLocations.contact_person.email}
        </Text>
      </View>

      {/* Receiver Name */}
      <View className="mb-4">
        <Text className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Receiver Name
        </Text>
        <Text className="text-lg font-bold text-gray-800 mt-1">
          {shipment.pickupLocations.receiver.full_name}
        </Text>
      </View>

      {/* Receiver Phone Number */}
      <View className="mb-4">
        <Text className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
          Receiver Phone Number
        </Text>
        <Text className="text-lg font-bold text-gray-800 mt-1">
          {shipment.pickupLocations.receiver.phone_number}
        </Text>
      </View>
    </View>
  );
};

export default DetailOrder;
