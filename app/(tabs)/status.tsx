import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";

const StatusItem = ({ status, onPress, isMarked, isActive, isLast }) => {
  return (
    <TouchableOpacity style={styles.statusItem} onPress={onPress}>
      <View style={[styles.dot, isMarked && styles.markedDot]} />

      <Text style={isMarked ? styles.marked : styles.unmarked}>
        {status.name} {isMarked ? "✔️" : ""}
      </Text>

      {!isLast && <View style={[styles.line, isMarked && styles.markedLine]} />}
    </TouchableOpacity>
  );
};
const Status = () => {
  const statuses = [
    { id: 1, name: "Start Trip to Pickup Location", children: [] },
    { id: 2, name: "Reached Pickup Location", children: [] },
    { id: 3, name: "Received Order", children: [] },
    { id: 4, name: "Start Trip to Delivery Location", children: [] },
    { id: 5, name: "Reached Delivery Location", children: [] },
    { id: 6, name: "Handoff", children: [] },
  ];

  const [markedStatuses, setMarkedStatuses] = useState({});
  const [activeStatusIndex, setActiveStatusIndex] = useState(0);

  const handleUpdateStatuses = () => {
    const updatedMarks = { ...markedStatuses };

    for (let i = 0; i < statuses.length; i++) {
      if (!updatedMarks[statuses[i].id]) {
        updatedMarks[statuses[i].id] = true;
        setActiveStatusIndex(i + 1);
        break;
      }
    }
    
    setMarkedStatuses(updatedMarks);
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
            isActive={index === activeStatusIndex}
            isLast={index === statuses.length - 1}
            onPress={() => router.push("/Route")}
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
    paddingLeft: 40,
    backgroundColor: "#f8f8f8",
  },
  container: {
    flex: 1,
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
    textDecorationLine: "line-through",
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
  screenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  screenText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Status;
