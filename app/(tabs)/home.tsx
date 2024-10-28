import { View, Text, FlatList } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import EmptyList from "@/components/EmptyList";
import { ActiveOrders } from "@/shared/models/shipmnet-orders.model";
import ActiveShipments from "@/components/ActiveShipments";

const current_orders: ActiveOrders[] = [
  {
    id: "1",
    start_time: "1:45 PM",
    end_time: "4:45 PM",
    pick_up_location: "Georgetwon (DSE2) AMZL (6705 E Marginal Way South",
    drop_of_location: "6705 East Marginal Way South",
  },
  {
    id: "2",
    start_time: "1:45 PM",
    end_time: "4:45 PM",
    pick_up_location: "Georgetwon (DSE2) AMZL (6705 E Marginal Way South",
    drop_of_location: "6705 East Marginal Way South",
  },
  {
    id: "3",
    start_time: "1:45 PM",
    end_time: "4:45 PM",
    pick_up_location: "Georgetwon (DSE2) AMZL (6705 E Marginal Way South",
    drop_of_location: "6705 East Marginal Way South",
  },
  {
    id: "4",
    start_time: "1:45 PM",
    end_time: "4:45 PM",
    pick_up_location: "Georgetwon (DSE2) AMZL (6705 E Marginal Way South",
    drop_of_location: "6705 East Marginal Way South",
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
        ListHeaderComponent={() => (
          <View className="pt-2 pb-3 mb-2 border-b border-gray-100">
            <Text className="font-pregular text-xl">TODAY</Text>
          </View>
        )}
        ListEmptyComponent={() => <EmptyList />}
        contentContainerStyle={{ padding: 20, margin: 0 }}
        // style={{ flex: 1, padding: 0, margin: 0 }}
      />
      {/* <StatusBar backgroundColor="#161622" style="light" /> */}
    </SafeAreaView>
  );
};

export default Home;
