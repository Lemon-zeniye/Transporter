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
  const [signatures, setSignatures] = useState<{
    [key: string]: string | null;
  }>({});
  const [showSignature, setShowSignature] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [submittedRemarks, setSubmittedRemarks] = useState<
    { orderId: string; remark: string }[]
  >([]);
  const [submittedSignatures, setSubmittedSignatures] = useState<
    { orderId: string; signature: string | null }[]
  >([]);
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to track overall submission

  const handleInputChange = (orderId: string, remark: string) => {
    setRemarks((prev) => ({ ...prev, [orderId]: remark }));
  };

  const submitRemark = (orderId: string) => {
    const newRemark = remarks[orderId] || "";
    if (newRemark) {
      setSubmittedRemarks((prev) => [...prev, { orderId, remark: newRemark }]);
      setRemarks((prev) => ({ ...prev, [orderId]: "" })); // Clear the remark input after submission
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
    // Show confirmation alert
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
            // Process all submitted remarks and signatures
            console.log("Submitting all remarks and signatures", {
              submittedRemarks,
              submittedSignatures,
            });

            // Clear all submitted data after processing
            setSubmittedRemarks([]);
            setSubmittedSignatures([]);
            setRemarks({});
            setSignatures({});
            setIsSubmitted(true); // Update submission state
          },
        },
      ],
      { cancelable: false },
    );
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
      </View>

      <TouchableOpacity
        style={styles.submitRemarkButton}
        onPress={() => submitRemark(item.id)}
        disabled={!remarks[item.id]}
      >
        <Text style={styles.buttonText}>Submit Remark</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.signatureButton}
        onPress={() => {
          setShowSignature(true);
          setSelectedOrderId(item.id);
        }}
      >
        <Text style={styles.buttonText}>Sign Here</Text>
      </TouchableOpacity>
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

      {/* Display submitted remarks and signatures */}
      <View style={styles.submissionContainer}>
        {submittedRemarks.map((remark) => (
          <View key={remark.orderId} style={styles.submissionItem}>
            <Text style={styles.submissionText}>Remark: {remark.remark}</Text>
            {/* Display the corresponding signature if it exists */}
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
  submitRemarkButton: {
    backgroundColor: "#28a745",
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  signatureButton: {
    backgroundColor: "#007BFF",
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  submitAllButton: {
    backgroundColor: "#FF5733",
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 16,
  },
  signature: {
    width: "100%",
    height: 200,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 10,
    borderRadius: 10,
  },
  submissionContainer: {
    marginTop: 20,
    backgroundColor: "#ffffff",
    padding: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  submissionItem: {
    marginBottom: 10,
  },
  submissionText: {
    fontSize: 14,
    color: "#333",
  },
  signatureContainer: {
    marginTop: 5,
    alignItems: "center",
  },
  signatureImage: {
    width: 100,
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 5,
  },
  clearButtonText: {
    color: "red",
    textDecorationLine: "underline",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  },
  signatureLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  submissionMessage: {
    marginTop: 10,
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
  },
});
