import { FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

interface Order {
  id: string;
  start_time: string;
  end_time: string;
  pick_up_location: string;
  drop_of_location: string;
  remark: string; 
}

const Handoff: React.FC = () => {
  const [currentOrders, setCurrentOrders] = useState<Order[]>([
    {
      id: "1",
      start_time: "1:45 PM",
      end_time: "4:45 PM",
      pick_up_location: "Georgetown (DSE2) AMZL (6705 E Marginal Way South)",
      drop_of_location: "6705 East Marginal Way South",
      remark: "", 
    },

  ]);

  const [remarks, setRemarks] = useState<{ [key: string]: string }>({}); // Separate state for remarks

  const handleRemarkChange = (orderId: string, text: string) => {
    setRemarks((prev) => ({ ...prev, [orderId]: text })); // Update the specific order remark
  };

  const submitRemark = (orderId: string) => {
    const updatedOrders = currentOrders.map((order) => {
      if (order.id === orderId) {
        return { ...order, remark: remarks[orderId] || "" }; // Use the remark from the state
      }
      return order;
    });
    setCurrentOrders(updatedOrders); 
    setRemarks((prev) => ({ ...prev, [orderId]: "" })); // Clear the specific remark after submission
  };

  const renderOrder = ({ item }: { item: Order }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderText}>Start Time: {item.start_time}</Text>
      <Text style={styles.orderText}>End Time: {item.end_time}</Text>
      <Text style={styles.orderText}>
        Pick-Up Location: {item.pick_up_location}
      </Text>
      <Text style={styles.orderText}>
        Drop-Off Location: {item.drop_of_location}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter remark...."
        value={remarks[item.id] || ""} // Bind the input to the specific order remark
        onChangeText={(text) => handleRemarkChange(item.id, text)} 
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => submitRemark(item.id)} 
        disabled={!remarks[item.id]} // Disable button if no remark
      >
        <Text style={styles.buttonText}>Remark</Text>
      </TouchableOpacity>
      {item.remark ? (
        <Text style={styles.remarkText}>Remark: {item.remark}</Text>
      ) : null}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={currentOrders}
        renderItem={renderOrder}
        keyExtractor={(item) => item.id}
        style={styles.ordersList}
      />
    </View>
  );
};

export default Handoff;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  ordersList: {
    width: "100%",
    marginBottom: 20,
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
  orderText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20, 
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f0f0f0",
  },
  submitButton: {
    backgroundColor: "#007BFF",
    borderRadius: 20, 
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  remarkText: {
    fontSize: 14,
    color: "#007BFF",
    marginTop: 10,
  },
});
