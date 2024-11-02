import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from "react-native";
import React, { useState } from "react";
import SignatureCapture from "react-native-signature-canvas";
import { shipments } from "@/mock-data/shipment";

const shipment = shipments[0];

const Handoff: React.FC = () => {
  const [remarks, setRemarks] = useState<{ [key: string]: string }>({});
  const [signatures, setSignatures] = useState<{ [key: string]: string | null }>({});
  const [showSignature, setShowSignature] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [submittedData, setSubmittedData] = useState<
    { orderId: string; remark: string; quantity: string }[]
  >([]);
  const [quantities, setQuantities] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (orderId: string, remark: string) => {
    setRemarks((prev) => ({ ...prev, [orderId]: remark }));
  };

  const handleQuantityChange = (orderId: string, quantity: string) => {
    const numericValue = quantity.replace(/[^0-9]/g, "");
    setQuantities((prev) => ({ ...prev, [orderId]: numericValue }));
  };

  const handleSubmitData = (orderId: string) => {
    const remark = remarks[orderId] || "";
    const quantity = quantities[orderId] || "";

    if (remark && quantity) {
      setSubmittedData((prev) => [
        ...prev,
        { orderId, remark, quantity },
      ]);
      setRemarks((prev) => ({ ...prev, [orderId]: "" }));
      setQuantities((prev) => ({ ...prev, [orderId]: "" }));
    }
  };

  const handleSignature = (signature: string) => {
    if (selectedOrderId) {
      setSignatures((prev) => ({ ...prev, [selectedOrderId]: signature }));
      setShowSignature(false);
    }
  };

  const clearSignature = () => {
    if (selectedOrderId) {
      setSignatures((prev) => ({ ...prev, [selectedOrderId]: null }));
    }
  };

  const handleSubmitAll = () => {
    Alert.alert(
      "Confirm Submission",
      "Are you sure you want to submit all the data?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            console.log("Submitting all data", { submittedData, signatures });
            setSubmittedData([]);
            setRemarks({});
            setSignatures({});
            setQuantities({});
            setIsSubmitted(true);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const takePicture = () => {
    console.log("Taking picture...");
  };

  const renderOrder = ({ item }: { item: { id: string } }) => (
    <View style={styles.orderItem}>
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Enter remark..."
          placeholderTextColor="#888"
          value={remarks[item.id] || ""}
          onChangeText={(text) => handleInputChange(item.id, text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Quantity received"
          placeholderTextColor="#888"
          value={quantities[item.id] || ""}
          onChangeText={(text) => {
            const numericValue = parseInt(text, 10);
            if (
              numericValue <= shipment.pickupLocations.quantity ||
              text === ""
            ) {
              handleQuantityChange(item.id, text);
            } else {
              alert(
                `Quantity cannot exceed ${shipment.pickupLocations.quantity}`
              );
            }
          }}
          keyboardType="numeric"
          maxLength={
            shipment.pickupLocations.quantity?.toString().length || 0
          }
        />
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => handleSubmitData(item.id)}
          disabled={!remarks[item.id] || !quantities[item.id]}
        >
          <Text style={styles.buttonText}>Submit Remark & Quantity</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.signatureCameraContainer}>
        <TouchableOpacity
          style={styles.signatureButton}
          onPress={() => {
            setShowSignature(true);
            setSelectedOrderId(item.id);
          }}
        >
          <Text style={styles.buttonText}>Sign Here</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
          <Text style={styles.buttonText}>Take Picture</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={[{ id: "1" }]}
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
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setShowSignature(false)}
          >
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.submissionContainer}>
        {submittedData.map((data) => (
          <View key={data.orderId} style={styles.submissionItem}>
            <Text style={styles.submissionText}>
              Remark: {data.remark}, Quantity received: {data.quantity}
            </Text>
            {signatures[data.orderId] && (
              <View style={styles.signatureContainer}>
                <Text style={styles.signatureLabel}>Signature:</Text>
                <Image
                  source={{ uri: signatures[data.orderId] || "" }}
                  style={styles.signatureImage}
                />
              </View>
            )}
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.submitAllButton}
        onPress={handleSubmitAll}
      >
        <Text style={styles.buttonText}>Submit All</Text>
      </TouchableOpacity>

      {isSubmitted && (
        <Text style={styles.submissionMessage}>
          All data submitted successfully!
        </Text>
      )}
    </View>
  );
};

export default Handoff;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f4f8",
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
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  inputSection: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: "#d1d9e0",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: "#f9fbfd",
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
    width: "100%", // Set width to 100% for full container width
    justifyContent: "center",
    alignItems: "center",
  },
  signatureCameraContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  signatureButton: {
    backgroundColor: "#ff9800",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  cameraButton: {
    backgroundColor: "#3f51b5",
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  submissionContainer: {
    marginTop: 20,
  },
  submissionItem: {
    padding: 10,
    backgroundColor: "#e8f5e9",
    borderRadius: 5,
    marginVertical: 5,
  },
  submissionText: {
    fontSize: 14,
    color: "#333",
  },
  signatureContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  signatureLabel: {
    fontWeight: "bold",
  },
  signatureImage: {
    width: 100,
    height: 50,
    marginLeft: 5,
    borderRadius: 5,
  },
  submitAllButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "center",
    width: "80%",
  },
  submissionMessage: {
    fontSize: 16,
    color: "green",
    textAlign: "center",
    marginTop: 15,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  signature: {
    width: "90%",
    height: 200,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalButton: {
    marginTop: 10,
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
  },
  clearButton: {
    marginTop: 10,
    backgroundColor: "#ff5722",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
  },
  clearButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
