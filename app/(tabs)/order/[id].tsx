import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { shipments } from "@/mock-data/shipment";

const OrderDetail = () => {
  const shipment = shipments[0];
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Shipment Details</Text>

      <Text style={styles.label}>Shipment Number:</Text>
      <Text style={styles.value}>{shipment.shipmentNumber}</Text>

      <Text style={styles.label}>Shipment Date:</Text>
      <Text style={styles.value}>{shipment.shipmentDate}</Text>

      <Text style={styles.header}>Pickup Location</Text>
      <Text style={styles.label}>Location:</Text>
      <Text style={styles.value}>
        {shipment.pickupLocations.pickup_location}
      </Text>
      <Text style={styles.label}>Pickup Date:</Text>
      <Text style={styles.value}>{shipment.pickupLocations.pickup_date}</Text>
      <Text style={styles.label}>Contact Person:</Text>
      <Text style={styles.value}>
        {shipment.pickupLocations.contact_person.full_name}
      </Text>
      <Text style={styles.label}>Contact Phone:</Text>
      <Text style={styles.value}>
        {shipment.pickupLocations.contact_person.phone_number}
      </Text>

      <Text style={styles.header}>Items</Text>
      {shipment.items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.label}>Item Description:</Text>
          <Text style={styles.value}>{item.itemDescription}</Text>
          <Text style={styles.label}>Category:</Text>
          <Text style={styles.value}>{item.itemCategory}</Text>
          <Text style={styles.label}>Packaging Type:</Text>
          <Text style={styles.value}>{item.packagingType}</Text>
          <Text style={styles.label}>Quantity:</Text>
          <Text style={styles.value}>{item.quantity}</Text>
          <Text style={styles.label}>Weight:</Text>
          <Text style={styles.value}>{item.weight} kg</Text>
          <Text style={styles.label}>Total Weight:</Text>
          <Text style={styles.value}>{item.totalWeight} kg</Text>
          <Text style={styles.label}>Dimensions:</Text>
          <Text style={styles.value}>
            {item.dimension.length} x {item.dimension.width} x{" "}
            {item.dimension.height} m
          </Text>

          <Text style={styles.header}>Drop Off Locations</Text>
          {item.dropOffLocations.map((dropOff, dropOffIndex) => (
            <View key={dropOffIndex}>
              <Text style={styles.label}>Dropoff Location:</Text>
              <Text style={styles.value}>{dropOff.dropoff_location}</Text>
              <Text style={styles.label}>Delivery Date:</Text>
              <Text style={styles.value}>{dropOff.delivery_date}</Text>
              <Text style={styles.label}>Receiver Name:</Text>
              <Text style={styles.value}>{dropOff.reciver.full_name}</Text>
              <Text style={styles.label}>Receiver Phone:</Text>
              <Text style={styles.value}>{dropOff.reciver.phone_number}</Text>
              <Text style={styles.label}>Quantity:</Text>
              <Text style={styles.value}>{dropOff.quantity}</Text>
            </View>
          ))}
        </View>
      ))}

      <Text style={styles.header}>Driver Details</Text>
      <Text style={styles.label}>Driver Name:</Text>
      <Text style={styles.value}>{shipment.driver.full_name}</Text>
      <Text style={styles.label}>Contact Number:</Text>
      <Text style={styles.value}>{shipment.driver.contact_number}</Text>

      <Text style={styles.header}>Vehicle Details</Text>
      <Text style={styles.label}>Vehicle Number:</Text>
      <Text style={styles.value}>{shipment.vehicle.vehicleNumber}</Text>
      <Text style={styles.label}>Vehicle Type:</Text>
      <Text style={styles.value}>{shipment.vehicle.vehicleType}</Text>

      <Text style={styles.header}>Status:</Text>
      <Text style={styles.value}>{shipment.status}</Text>
    </ScrollView>
  );
};

export default OrderDetail;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  label: {
    fontWeight: "bold",
    marginTop: 4,
  },
  value: {
    marginBottom: 8,
  },
  itemContainer: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
  },
});
