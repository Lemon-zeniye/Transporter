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
          margin: 10,
          borderWidth: 2,
          borderRadius: 10,
          backgroundColor: "#ecf0f1",
        }}
      />
    </SafeAreaView>
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
