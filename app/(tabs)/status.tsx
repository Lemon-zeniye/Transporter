import ActiveShipments from "@/components/ActiveShipments";
import CustomButton from "@/components/CustomButton";
import EmptyList from "@/components/EmptyList";
import { ActiveOrders } from "@/shared/models/shipmnet-orders.model";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Button,
} from "react-native";

const statuses = [
  "Accept",
  "Started",
  "Reached Pickup",
  "Received Order",
  "Start Trip",
  "Reached Destination",
  "Handoff",
];

const Status = () => {
  const [activeStatusIndex, setActiveStatusIndex] = useState(0);

  const handleNextStatus = () => {
    setActiveStatusIndex((prevIndex) => {
      return (prevIndex + 1) % statuses.length;
    });
  };

  const orderInfo = {
    id: "1",
    pickup_date: "OCT/30/2024",
    start_time: "1:45 PM",
    end_time: "4:45 PM",
    pick_up_location: "Yeka, Gulf, Southern Region, Papua New Guinea",
    drop_of_location: "Yeka, Agago, Northern Region, Uganda",
  };

  return (
    <>
      <View style={styles.orderItem}>
        <Text style={styles.orderText}>Pickup Date</Text>
        <Text className="text-xm font-bold">{orderInfo.pickup_date}</Text>
        <Text style={styles.orderText}>Pickup Time</Text>
        <Text className="text-xm font-bold">
          {orderInfo.start_time} - {orderInfo.end_time}
        </Text>
        <Text style={styles.orderText}>Pick-Up Location</Text>
        <Text className="text-xm font-bold">{orderInfo.pick_up_location}</Text>
        <Text style={styles.orderText}>Drop-Off Location</Text>
        <Text className="text-xm font-bold">{orderInfo.drop_of_location}</Text>
        <View>
          <Text className="mt-10 font-bold">0912345678</Text>
          <CustomButton
            buttonStyle="w-16 bg-blue-600 "
            textStyle="text-white"
            title="CALL"
            handlePress={() => {
              console.log();
            }}
            isLoading={false}
          />
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Order Status</Text>
        {statuses.map((status, index) => (
          <Text
            key={index}
            style={[
              styles.status,
              index === activeStatusIndex
                ? styles.activeStatus
                : styles.inactiveStatus,
            ]}
          >
            {status}
          </Text>
        ))}
        <TouchableOpacity style={styles.button} onPress={handleNextStatus}>
          <Text style={styles.buttonText}>Next Status</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  status: {
    fontSize: 18,
    padding: 10,
  },
  activeStatus: {
    color: "green",
    fontWeight: "bold",
  },
  inactiveStatus: {
    color: "gray",
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  orderText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  orderItem: {
    backgroundColor: "#ffffff",
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    width: "90%",
    alignSelf: "center",
  },
});

export default Status;
