import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Linking,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { shipments } from "@/mock-data/shipment";

const ReachedDestination = () => {
  const shipment = shipments[0];
  const phoneNumber = shipment.pickupLocations.receiver.phone_number;
  const handleCallPress = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/profile.png")}
        style={styles.profileImage}
      />
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text className="text-xl font-medium">Name: </Text>
        <Text className="text-xl font-regular">
          {shipment.pickupLocations.receiver.full_name}
        </Text>
      </View>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <Text className="text-xl font-medium">Phone Number: </Text>
        <Text className="text-xl font-regular">{phoneNumber}</Text>
      </View>

      <TouchableOpacity style={styles.callButton} onPress={handleCallPress}>
        <Icon name="phone" size={20} color="#fff" />
        <Text style={styles.buttonText}>Call Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    marginTop: 50,
    marginLeft: 30,
    backgroundColor: "#f5f5f5",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  callButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#28a745",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
  },
});

export default ReachedDestination;
