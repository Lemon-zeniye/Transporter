import { FlatList, StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Modal } from "react-native";
import React, { useState } from "react";
import SignatureCapture from 'react-native-signature-canvas';

interface Order {
  id: string;
  start_time: string;
  end_time: string;
  pick_up_location: string;
  drop_of_location: string;
  remark: string; 
  note: string;
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
      note: "",
    },
  ]);

  const [remarks, setRemarks] = useState<{ [key: string]: string }>({});
  const [notes, setNotes] = useState<{ [key: string]: string }>({});
  const [signature, setSignature] = useState<string | null>(null);
  const [showSignature, setShowSignature] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handleInputChange = (orderId: string, remark: string, note: string) => {
    setRemarks((prev) => ({ ...prev, [orderId]: remark }));
    setNotes((prev) => ({ ...prev, [orderId]: note }));
  };

  const submitInputs = (orderId: string) => {
    const updatedOrders = currentOrders.map((order) => {
      if (order.id === orderId) {
        return {
          ...order,
          remark: remarks[orderId] || "",
          note: notes[orderId] || ""
        };
      }
      return order;
    });
    setCurrentOrders(updatedOrders);
    setRemarks((prev) => ({ ...prev, [orderId]: "" }));
    setNotes((prev) => ({ ...prev, [orderId]: "" }));
  };

  const handleSignature = (signature: string) => {
    setSignature(signature);
    setShowSignature(false);
  };

  const clearSignature = () => {
    setSignature(null);
  };

  const renderOrder = ({ item }: { item: Order }) => (
    <View style={styles.orderItem}>
      <View style={styles.orderDetails}>
        <Text style={styles.orderText}>Start Time: {item.start_time}</Text>
        <Text style={styles.orderText}>End Time: {item.end_time}</Text>
        <Text style={styles.orderText}>Pick-Up Location: {item.pick_up_location}</Text>
        <Text style={styles.orderText}>Drop-Off Location: {item.drop_of_location}</Text>
      </View>

      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Enter remark..."
          placeholderTextColor="#888"
          value={remarks[item.id] || ""}
          onChangeText={(text) => handleInputChange(item.id, text, notes[item.id] || "")}
        />
        <TextInput
          style={styles.input}
          placeholder="Add a note..."
          placeholderTextColor="#888"
          value={notes[item.id] || ""}
          onChangeText={(text) => handleInputChange(item.id, remarks[item.id] || "", text)}
        />
      </View>

      <TouchableOpacity
        style={[styles.submitButton, { opacity: remarks[item.id] || notes[item.id] ? 1 : 0.5 }]}
        onPress={() => submitInputs(item.id)}
        disabled={!remarks[item.id] && !notes[item.id]}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      {item.remark && <Text style={styles.remarkText}>Remark: {item.remark}</Text>}
      {item.note && <Text style={styles.noteText}>Note: {item.note}</Text>}

      <TouchableOpacity
        style={styles.signatureButton}
        onPress={() => {
          setShowSignature(true);
          setSelectedOrderId(item.id); // Save selected order ID for signature
        }}
      >
        <Text style={styles.buttonText}>Sign Here</Text>
      </TouchableOpacity>
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

      <Modal visible={showSignature} transparent={true}>
        <View style={styles.modalContainer}>
          <SignatureCapture
            style={styles.signature}
            onOK={handleSignature}
            backgroundColor="white"
          />
          <TouchableOpacity style={styles.clearButton} onPress={clearSignature}>
            <Text style={styles.clearButtonText}>Clear Signature</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.modalButton} onPress={() => setShowSignature(false)}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {signature && (
        <View style={styles.signatureContainer}>
          <Text style={styles.signatureLabel}>Signature:</Text>
          <Image source={{ uri: signature }} style={styles.signatureImage} />
        </View>
      )}
    </View>
  );
};

export default Handoff;

const styles = StyleSheet.create({
  container: {
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
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    width: "100%",
  },
  orderDetails: {
    marginBottom: 15,
  },
  orderText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  inputSection: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f0f0f0",
  },
  submitButton: {
    backgroundColor: "#007BFF",
    borderRadius: 25,
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
  noteText: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  signature: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    marginTop: 10,
    borderRadius: 10,
  },
  signatureContainer: {
    marginTop: 10,
    alignItems: "center",
  },
  signatureImage: {
    width: 100,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 5,
  },
  clearButtonText: {
    color: 'red',
    textDecorationLine: 'underline',
  },
  signatureButton: {
    backgroundColor: "#007BFF",
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  clearButton: {
    marginVertical: 10,
  },
  modalButton: {
    backgroundColor: "#007BFF",
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 10,
  },
  signatureLabel: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
});
