import React from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";

const Route: React.FC = () => {
  const [region, setRegion] = React.useState<Region>({
    latitude: 8.994513,
    longitude: 38.785424,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(region) => setRegion(region)}
      >
        <Marker
          coordinate={{ latitude: 8.994513, longitude: 38.785424 }}
          title="My Location"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Route;
