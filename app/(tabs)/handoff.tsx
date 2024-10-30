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
<<<<<<< HEAD
import SignatureCapture from "react-native-signature-canvas";
=======
import SignatureCapture from 'react-native-signature-canvas';
import Icon from 'react-native-vector-icons/Ionicons';
>>>>>>> 46e63999160799851742eb4dec629f5cbb023b0b

const Handoff: React.FC = () => {
  const [remarks, setRemarks] = useState<{ [key: string]: string }>({});
  const [signatures, setSignatures] = useState<{
    [key: string]: string | null;
  }>({});
  const [showSignature, setShowSignature] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
<<<<<<< HEAD
  const [submittedRemarks, setSubmittedRemarks] = useState<
    { orderId: string; remark: string }[]
  >([]);
  const [submittedSignatures, setSubmittedSignatures] = useState<
    { orderId: string; signature: string | null }[]
  >([]);
  const [isSubmitted, setIsSubmitted] = useState(false); // New state to track overall submission
=======
  const [submittedRemarks, setSubmittedRemarks] = useState<{ orderId: string; remark: string }[]>([]);
  const [submittedSignatures, setSubmittedSignatures] = useState<{ orderId: string; signature: string | null }[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
>>>>>>> 46e63999160799851742eb4dec629f5cbb023b0b

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
            console.log("Submitting all remarks and signatures", {
              submittedRemarks,
              submittedSignatures,
            });

            setSubmittedRemarks([]);
            setSubmittedSignatures([]);
            setRemarks({});
            setSignatures({});
            setIsSubmitted(true);
          },
        },
      ],
      { cancelable: false },
    );
  };

  const takePicture = () => {
    // Add camera logic here
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

      <TouchableOpacity
        style={styles.cameraButton}
        onPress={takePicture}
      >
        <Icon name="camera" size={20} color="#ffffff" />
        <Text style={styles.buttonText}>Take Picture</Text>
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

      <View style={styles.submissionContainer}>
        {submittedRemarks.map((remark) => (
          <View key={remark.orderId} style={styles.submissionItem}>
            <Text style={styles.submissionText}>Remark: {remark.remark}</Text>
<<<<<<< HEAD
            {/* Display the corresponding signature if it exists */}
            {submittedSignatures.find(
              (sig) => sig.orderId === remark.orderId,
            ) && (
=======
            {submittedSignatures.find(sig => sig.orderId === remark.orderId) && (
>>>>>>> 46e63999160799851742eb4dec629f5cbb023b0b
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
  },
  submitRemarkButton: {
    backgroundColor: "#1f78b4",
    borderRadius: 5,
    paddingVertical: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  signatureButton: {
    backgroundColor: "#1f78b4",
    borderRadius: 5,
    paddingVertical: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  cameraButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#ffa726",
    borderRadius: 5,
    paddingVertical: 8,
    justifyContent: "center",
    marginBottom: 8,
  },
  submitAllButton: {
    backgroundColor: "#1f78b4",
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 5,
  },
  signature: {
    width: "100%",
    height: 200,
    borderWidth: 1,
<<<<<<< HEAD
    borderColor: "#ccc",
=======
    borderColor: '#d1d9e0',
>>>>>>> 46e63999160799851742eb4dec629f5cbb023b0b
    marginTop: 10,
    borderRadius: 10,
  },
  submissionContainer: {
    marginTop: 20,
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  submissionItem: {
    marginBottom: 10,
  },
  submissionText: {
    fontSize: 14,
    color: "#455a64",
  },
  signatureContainer: {
    marginTop: 5,
    alignItems: "center",
  },
  signatureImage: {
    width: 100,
    height: 50,
<<<<<<< HEAD
    borderColor: "#ccc",
=======
    borderColor: '#d1d9e0',
>>>>>>> 46e63999160799851742eb4dec629f5cbb023b0b
    borderWidth: 1,
    marginVertical: 5,
    borderRadius: 5,
  },
  clearButtonText: {
<<<<<<< HEAD
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
=======
    color: '#ff5252',
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
>>>>>>> 46e63999160799851742eb4dec629f5cbb023b0b
  },
  modalButton: {
    backgroundColor: "#1f78b4",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },
  submissionMessage: {
    color: "#2e7d32",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 15,
  },
  clearButton: {
    marginVertical: 8,
  },
  signatureLabel: {
    fontSize: 14,
<<<<<<< HEAD
    fontWeight: "bold",
  },
  submissionMessage: {
    marginTop: 10,
    fontSize: 16,
    color: "green",
    fontWeight: "bold",
=======
    fontWeight: 'bold',
    color: "#455a64",
>>>>>>> 46e63999160799851742eb4dec629f5cbb023b0b
  },
});
