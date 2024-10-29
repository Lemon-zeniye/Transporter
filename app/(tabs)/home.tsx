import { FlatList } from "react-native";
import { View, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyList from "@/components/EmptyList";
import { ActiveOrders } from "@/shared/models/shipmnet-orders.model";
import ActiveShipments from "@/components/ActiveShipments";

const current_orders: ActiveOrders[] = [
  {
    id: "1",
    pickup_date: "OCT/30/2024",
    start_time: "1:45 PM",
    end_time: "4:45 PM",
    pick_up_location: "Yeka, Gulf, Southern Region, Papua New Guinea",
    drop_of_location: "Yeka, Agago, Northern Region, Uganda",
  },
];

const Home = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, padding: 0, margin: 0 }}
      edges={["left", "right"]}
    >
      <FlatList
        data={current_orders ?? []}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }) => <ActiveShipments current_orders={item} />}
        ListEmptyComponent={() => <EmptyList />}
        contentContainerStyle={{
          padding: 20,
          margin: 1,
          borderWidth: 1,
        }}
      />
    </SafeAreaView>
  );
};
const IconExample = () => {
  return (
    <View style={styles.container}>
      {/* Message Icon */}
      <Icon name="message" size={30} color="#4CAF50" style={styles.icon} />

      {/* Call Icon */}
      <Icon name="call" size={30} color="#2196F3" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    margin: 10,
  },
});

export default Home;
