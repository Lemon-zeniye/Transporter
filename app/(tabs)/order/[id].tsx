// import { View, Text, StyleSheet } from "react-native";
// import React from "react";
// import { ScrollView } from "react-native-gesture-handler";
// import { shipments } from "@/mock-data/shipment";
// import CustomeButton from "@/components/CustomeButton";
// import { router } from "expo-router";

// const OrderDetail = () => {
//   const shipment = shipments[0];

//   const onAccept = () => {
//     router.push("/countdown");
//   };

//   const onDecline = () => {
//     router.push("/declineOrder");
//   };
//   return (
//     <>
//       <ScrollView style={styles.container}>
//         <View style={styles.pickup}>
//           <Text style={styles.header}>Pickup Location</Text>
//           <Text style={styles.label}>Location:</Text>
//           <Text style={styles.value}>
//             {shipment.pickupLocations.pickup_location}
//           </Text>
//           <Text style={styles.label}>Pickup Date:</Text>
//           <Text style={styles.value}>
//             {shipment.pickupLocations.pickup_date}
//           </Text>

//           <View style={styles.contactMain}>
//             <View>
//               <Text style={styles.label}>Contact Person:</Text>
//               <Text style={styles.value}>
//                 {shipment.pickupLocations.contact_person.full_name}
//               </Text>
//             </View>
//             <View>
//               <Text style={styles.label}>Contact Phone:</Text>
//               <Text style={styles.value}>
//                 {shipment.pickupLocations.contact_person.phone_number}
//               </Text>
//             </View>
//           </View>
//         </View>

//         {shipment.items.map((item, index) => (
//           <View style={styles.itemContainer}>
//             <View key={index}>
//               <Text style={styles.header}>Items</Text>
//               <Text style={styles.label}>Item Description:</Text>
//               <Text style={styles.value}>{item.itemDescription}</Text>
//               <Text style={styles.label}>Category:</Text>
//               <Text style={styles.value}>{item.itemCategory}</Text>
//               <Text style={styles.label}>Packaging Type:</Text>
//               <Text style={styles.value}>{item.packagingType}</Text>
//               <Text style={styles.label}>Quantity:</Text>
//               <Text style={styles.value}>{item.quantity}</Text>
//               <Text style={styles.label}>Total Weight:</Text>
//               <Text style={styles.value}>{item.totalWeight} kg</Text>
//               <Text style={styles.label}>Dimensions:</Text>
//               <Text style={styles.value}>
//                 {item.dimension.length} x {item.dimension.width} x{" "}
//                 {item.dimension.height} m
//               </Text>
//             </View>

//             {item.dropOffLocations.map((dropOff, dropOffIndex) => (
//               <View key={dropOffIndex} style={styles.dropoff}>
//                 <Text style={styles.header}>Drop Off Location</Text>

//                 <Text style={styles.label}>Dropoff Location:</Text>
//                 <Text style={styles.value}>{dropOff.dropoff_location}</Text>
//                 <Text style={styles.label}>Delivery Date:</Text>
//                 <Text style={styles.value}>{dropOff.delivery_date}</Text>
//                 <Text style={styles.label}>Receiver Name:</Text>
//                 <Text style={styles.value}>{dropOff.reciver.full_name}</Text>
//                 <Text style={styles.label}>Receiver Phone:</Text>
//                 <Text style={styles.value}>{dropOff.reciver.phone_number}</Text>
//                 <Text style={styles.label}>Quantity:</Text>
//                 <Text style={styles.value}>{dropOff.quantity}</Text>
//               </View>
//             ))}
//           </View>
//         ))}
//       </ScrollView>

//       <CustomeButton
//         buttonStyle="bg-secondary mt-3 w-full"
//         textStyle="text-primary"
//         title="Accept"
//         handlePress={onAccept}
//         isLoading={false}
//       />
//       <CustomeButton
//         buttonStyle="bg-secondary mt-3 mb-3 w-full"
//         textStyle="text-primary"
//         title="Decline"
//         handlePress={onDecline}
//         isLoading={false}
//       />
//     </>
//   );
// };

// export default OrderDetail;

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: "#fff",
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginTop: 16,
//     marginBottom: 8,
//   },
//   label: {
//     fontWeight: "bold",
//     marginTop: 4,
//   },
//   value: {
//     marginBottom: 20,
//   },
//   pickup: {
//     borderWidth: 1,
//     borderColor: "grey",
//     padding: 4,
//     borderRadius: 20,
//   },
//   itemContainer: {
//     display: "flex",
//     flexDirection: "row",
//     marginTop: 5,
//     borderWidth: 1,
//     borderColor: "grey",
//     padding: 4,
//     borderRadius: 20,
//   },
//   dropoff: {
//     marginLeft: 38,
//   },
//   contactMain: {
//     display: "flex",
//     flexDirection: "row",
//     gap: 100,
//   },
// });
