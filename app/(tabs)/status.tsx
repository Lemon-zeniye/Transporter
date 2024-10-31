import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { router } from "expo-router";

const StatusItem = ({ status, isMarked, isLast }) => {
  const handlePress = () => {
    switch (status.name) {
      case "Start Trip to Pickup Location":
        router.push("/Route");
        break;
      case "Reached Pickup Location":
        router.push("/Reached Pickup");
        break;
      case "Received Order":
        router.push("/handoff");
        break;
      case "Start Trip to Delivery Location":
        router.push("/Route");
        break;
      case "Reached Delivery Location":
        router.push("/Reached Destination");
        break;
      case "Handoff":
        router.push("/handoff");
        break;
      default:
        break;
    }
  };

  return (
    <TouchableOpacity style={styles.statusItem} onPress={handlePress}>
      <View style={[styles.dot, isMarked && styles.markedDot]} />
      <Text style={isMarked ? styles.marked : styles.unmarked}>
        {status.name}
      </Text>
      {!isLast && <View style={[styles.line, isMarked && styles.markedLine]} />}
    </TouchableOpacity>
  );
};

const Status = () => {
  const statuses = [
    { id: 1, name: "Start Trip to Pickup Location" },
    { id: 2, name: "Reached Pickup Location" },
    { id: 3, name: "Received Order" },
    { id: 4, name: "Start Trip to Delivery Location" },
    { id: 5, name: "Reached Delivery Location" },
    { id: 6, name: "Handoff" },
  ];

  const [markedStatuses, setMarkedStatuses] = useState({});
  const [activeStatusIndex, setActiveStatusIndex] = useState(0);

  const handleUpdateStatuses = () => {
    const updatedMarks = { ...markedStatuses };

    const currentStatus = statuses[activeStatusIndex];
    updatedMarks[currentStatus.id] = true;
    setMarkedStatuses(updatedMarks);

    switch (currentStatus.name) {
      case "Start Trip to Pickup Location":
        router.push("/Route");
        break;
      case "Reached Pickup Location":
        router.push("/Reached Pickup");
        break;
      case "Received Order":
        router.push("/handoff");
        break;
      case "Start Trip to Delivery Location":
        router.push("/Route");
        break;
      case "Reached Delivery Location":
        router.push("/Reached Destination");
        break;
      case "Handoff":
        router.push("/handoff");
        break;
      default:
        break;
    }

    if (activeStatusIndex < statuses.length - 1) {
      setActiveStatusIndex((prevIndex) => prevIndex + 1);
    }
  };

  const buttonText =
    activeStatusIndex < statuses.length
      ? `${statuses[activeStatusIndex].name}`
      : "Done";

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        {statuses.map((status, index) => (
          <StatusItem
            key={status.id}
            status={status}
            isMarked={markedStatuses[status.id]}
            isLast={index === statuses.length - 1}
          />
        ))}

        <TouchableOpacity
          style={styles.button}
          onPress={handleUpdateStatuses}
          disabled={activeStatusIndex >= statuses.length}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 50,
    backgroundColor: "#f8f8f8",
  },
  container: {
    flex: 1,
    marginTop: 250,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 18,
    backgroundColor: "#f8f8f8",
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "black",
    marginRight: 10,
  },
  markedDot: {
    backgroundColor: "green",
    borderColor: "green",
  },
  marked: {
    color: "green",
    fontWeight: "bold",
    fontSize: 18,
  },
  unmarked: {
    color: "black",
    fontWeight: "normal",
    fontSize: 18,
  },
  line: {
    width: 2,
    height: 37,
    backgroundColor: "black",
    position: "absolute",
    left: 4,
    top: 16,
  },
  markedLine: {
    backgroundColor: "green",
  },
  button: {
    width: 250,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default Status;
