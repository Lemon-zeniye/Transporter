import { FlatList } from "react-native";
import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import EmptyList from "@/components/EmptyList";
import { ActiveOrders } from "@/shared/models/shipmnet-orders.model";
import ActiveShipments from "@/components/ActiveShipments";
import CustomButton from "@/components/CustomButton";

const current_orders: ActiveOrders[] = [
  {
    id: "1",
    pickup_date: "OCT/30/2024",
    start_time: "1:45 PM",
    end_time: "4:45 PM",
    pick_up_location: "Addis Ababa",
    drop_of_location: "DEBREZEYET",
  },
];

const Home = () => {
  const [dropOfLocation, setDropOfLocation] = useState<string>(
    current_orders[0].drop_of_location
  );
  return (
    <>
      <SafeAreaView
        style={{ flex: 1, padding: 0, margin: 0 }}
        edges={["left", "right"]}
      >
        <FlatList
          data={current_orders ?? []}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }) => (
            <ActiveShipments
              current_orders={item}
              dropOfLocation={dropOfLocation}
              setDropOfLocation={setDropOfLocation}
            />
          )}
          ListEmptyComponent={() => <EmptyList />}
          contentContainerStyle={{
            padding: 20,
            margin: 10,
            borderWidth: 2,
            borderRadius: 10,
            backgroundColor: "#ecf0f1",
            height: 488,
          }}
        />
      </SafeAreaView>
      <CustomButton
        buttonStyle="w-full bg-secondary my-4 mb-112"
        textStyle="font-pregular text-center"
        title="ACCEPT ORDER"
        handlePress={() => {
          navigation.navigate("Status");
        }}
        isLoading={false}
      />
    </>
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
