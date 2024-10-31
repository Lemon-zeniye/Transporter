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

const Handoff: React.FC = () => {
  const [remarks, setRemarks] = useState<{ [key: string]: string }>({});
  const [signatures, setSignatures] = useState<{ [key: string]: string | null }>({});
  const [showSignature, setShowSignature] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [submittedRemarks, setSubmittedRemarks] = useState<{ orderId: string; remark: string }[]>([]);
  const [submittedSignatures, setSubmittedSignatures] = useState<{ orderId: string; signature: string | null }[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: string }>({});
  const [submittedQuantities, setSubmittedQuantities] = useState<{ orderId: string; quantity: string }[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (orderId: string, remark: string) => {
    setRemarks((prev) => ({ ...prev, [orderId]: remark }));
  };

  const handleQuantityChange = (orderId: string, quantity: string) => {
    const numericValue = quantity.replace(/[^0-9]/g, "");
    setQuantities((prev) => ({ ...prev, [orderId]: numericValue }));
  };

  const submitRemark = (orderId: string) => {
    const newRemark = remarks[orderId] || "";
    if (newRemark) {
      setSubmittedRemarks((prev) => [...prev, { orderId, remark: newRemark }]);
      setRemarks((prev) => ({ ...prev, [orderId]: "" }));
    }
  };

  const submitQuantity = (orderId: string) => {
    const newQuantity = quantities[orderId] || "";
    if (newQuantity) {
      setSubmittedQuantities((prev) => [...prev, { orderId, quantity: newQuantity }]);
      setQuantities((prev) => ({ ...prev, [orderId]: "" }));
    }
  };

  const handleSignature = (signature: string) => {
    if (selectedOrderId) {
      setSignatures((prev) => ({ ...prev, [selectedOrderId]: signature }));
      setSubmittedSignatures((prev) => [
        ...prev,
        { orderId: selectedOrderId, signature },
      ]);
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
            console.log("Submitting all remarks, signatures, and quantities", {
              submittedRemarks,
              submittedSignatures,
              submittedQuantities,
            });

            setSubmittedRemarks([]);
            setSubmittedSignatures([]);
            setRemarks({});
            setSignatures({});
            setQuantities({});
            setSubmittedQuantities([]);
            setIsSubmitted(true);
          },
        },
      ],
      { cancelable: false },
    );
  };

  const takePicture = () => {
    console.log("Taking picture...");
  };

  const renderOrder = ({ item }: { item: { id: string } }) => (
    <View style={styles.orderItem}>
      <View style={styles.inputSection}>
        <View style={styles.remarkInputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter remark..."
            placeholderTextColor="#888"
            value={remarks[item.id] || ""}
            onChangeText={(text) => handleInputChange(item.id, text)}
          />
          <TouchableOpacity
            style={styles.submitRemarkButton}
            onPress={() => submitRemark(item.id)}
            disabled={!remarks[item.id]}
          >
            <Text style={styles.buttonText}>Submit Remark</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.quantitySection}>
          <TextInput
            style={styles.input}
            placeholder="Quantity received"
            placeholderTextColor="#888"
            value={quantities[item.id] || ""}
            onChangeText={(text) => handleQuantityChange(item.id, text)}
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => submitQuantity(item.id)}
            disabled={!quantities[item.id]}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
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
        data={[{ id: "1" }]} // Placeholder for a single order
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
        {submittedRemarks.map((remark) => (
          <View key={remark.orderId} style={styles.submissionItem}>
            <Text style={styles.submissionText}>Remark: {remark.remark}</Text>
            {submittedSignatures.find(
              (sig) => sig.orderId === remark.orderId,
            ) && (
              <View style={styles.signatureContainer}>
                <Text style={styles.signatureLabel}>Signature:</Text>
                <Image
                  source={{ uri: signatures[remark.orderId] || "" }}
                  style={styles.signatureImage}
                />
              </View>
            )}
          </View>
        ))}
        
        {submittedQuantities.map((item) => (
          <View key={item.orderId} style={styles.submissionItem}>
            <Text style={styles.submissionText}>
              Quantity received: {item.quantity}
            </Text>
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
  remarkInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  quantitySection: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "#d1d9e0",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    backgroundColor: "#f9fbfd",
    marginBottom: 10,
    flex: 1,
  },
  addButton: {
    backgroundColor: "#4caf50",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  submitRemarkButton: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
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
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#e8f0fe",
    borderRadius: 5,
  },
  submissionText: {
    fontSize: 16,
  },
  signatureContainer: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  signatureLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
  },
  signatureImage: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  submitAllButton: {
    backgroundColor: "#4caf50",
    padding: 8, // Adjusted padding for smaller button
    borderRadius: 5,
    marginTop: 20,
    alignSelf: "center", // Centering the button
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  clearButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  clearButtonText: {
    color: "#ffffff",
  },
  modalButton: {
    backgroundColor: "#3f51b5",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
  },
  submissionMessage: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
    color: "green",
  },
  signature: {
    width: "90%",
    height: 200,
    backgroundColor: "#ffffff",
  },
});
