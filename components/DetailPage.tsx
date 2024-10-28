// import React from "react";
// import { View, Text } from "react-native";
// import { NativeStackScreenProps } from "@react-navigation/native-stack";

// // Define the param types for the route
// type RootStackParamList = {
//   DetailPage: { itemId: number; otherParam?: string };
// };

// // Define the props type using NativeStackScreenProps
// type DetailPageProps = NativeStackScreenProps<RootStackParamList, "DetailPage">;

// const DetailPage: React.FC<DetailPageProps> = ({ route }) => {
//   const { itemId, otherParam } = route.params;

//   return (
//     <View>
//       <Text>Detail Page for Item: {itemId}</Text>
//       {otherParam && <Text>Additional Info: {otherParam}</Text>}
//     </View>
//   );
// };

// export default DetailPage;

import { View, Text } from "react-native";
import React from "react";

const DetailPage = () => {
  return (
    <View>
      <Text>DetailPage</Text>
    </View>
  );
};

export default DetailPage;
