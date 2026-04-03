import React from "react";
import { View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

interface Props {
  lat?: number;
  lng?: number;
}

const MapViewComponent: React.FC<Props> = ({ lat, lng }) => {
  if (!lat) return null;

  return (
    <View className="w-full h-full items-center justify-center">
      <MapView
        className="w-full h-full"
        showsBuildings={true}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: lat || 30.3753,
          longitude: lng || 69.3451,
          latitudeDelta: 0.00122,
          longitudeDelta: 0.00421,
        }}
      >
        <Marker
          coordinate={{
            latitude: lat || 30.3753,
            longitude: lng || 69.3451,
          }}
          title={"Project location"}
          description={"Project location"}
        />
      </MapView>
    </View>
  );
};

export default MapViewComponent;
