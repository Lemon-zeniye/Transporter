import CustomButton from "@/components/CustomButton";
import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";

const StatusItem = ({ status, isMarked, isActive, isLast }) => {
  return (
    <View style={styles.statusItem}>
      <View style={[styles.dot, isMarked && styles.markedDot]} />
      <Text style={isMarked ? styles.marked : styles.unmarked}>
        {status.name} {isMarked ? "✔️" : ""}
      </Text>
      {/* Line connecting dots */}
      {!isLast && <View style={[styles.line, isMarked && styles.markedLine]} />}
    </View>
  );
};

const App = () => {
  // Define the statuses in a tree structure
  const statuses = [
    { id: 1, name: "Start Trip to Pickup Location", children: [] },
    { id: 2, name: "Reached Pickup Location", children: [] },
    { id: 3, name: "Received Order", children: [] },
    { id: 4, name: "Start Trip to Delivery Location", children: [] },
    { id: 5, name: "Reached Delivery Location", children: [] },
    { id: 6, name: "Handoff", children: [] },
  ];

  // State to track marked statuses
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 80,
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
  },
  unmarked: {
    color: "black",
    fontWeight: "normal",
  },
  line: {
    width: 2,
    height: 31,
    backgroundColor: "black",
    position: "absolute",
    left: 4,
    top: 14,
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
  },
});

export default App;
