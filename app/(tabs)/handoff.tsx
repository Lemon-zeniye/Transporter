import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

const Handoff = () => {
  const current_orders = [
    {
      id: "1",
      start_time: "1:45 PM",
      end_time: "4:45 PM",
      pick_up_location: "Georgetwon (DSE2) AMZL (6705 E Marginal Way South",
      drop_of_location: "6705 East Marginal Way South",
    },
  ];

  const renderOrder = ({ item }: { item: (typeof current_orders)[0] }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderText}>Start Time: {item.start_time}</Text>
      <Text style={styles.orderText}>End Time: {item.end_time}</Text>
      <Text style={styles.orderText}>
        Pick-Up Location: {item.pick_up_location}
      </Text>
      <Text style={styles.orderText}>
        Drop-Off Location: {item.drop_of_location}
      </Text>
    </View>
  );
  return (
    <View>
      <FlatList
        data={current_orders}
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
  timeText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    marginTop: 30,
    textAlign: "center",
  },
  button: {
    marginTop: 10,
    width: "80%",
  },
  ordersList: {
    width: "100%",
    marginBottom: 20,
  },
  orderItem: {
    backgroundColor: "#e0e0e0",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    width: "90%",
    alignSelf: "center",
  },
  orderText: {
    fontSize: 18, // Increase font size here
    color: "#333",
    marginBottom: 5,
  },
  handoffButton: {},
});
