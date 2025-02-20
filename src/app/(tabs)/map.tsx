import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { ScanType } from "../../types";
import type { ScanCenter } from "../../types";
import { CenterFilters } from "../../components/centers/CenterFilters";
import { useFilteredCenters } from "../../hooks/useFilteredCenters";
import { router } from "expo-router";
const DUMMY_CENTERS: ScanCenter[] = [
  {
    id: "1",
    name: "Harley Street Imaging",
    address: "102 Harley St, London W1G 7JB",
    latitude: 51.5194,
    longitude: -0.1468,
    rating: 9,
    imageUrl: "https://placehold.co/200x150",
    scanTypes: [ScanType.MRI, ScanType.CT, ScanType.XRAY],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "London Bridge Hospital",
    address: "27 Tooley St, London SE1 2PR",
    latitude: 51.5045,
    longitude: -0.0865,
    rating: 8,
    imageUrl: "https://placehold.co/200x150",
    scanTypes: [ScanType.MRI, ScanType.ULTRASOUND],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Wellington Hospital",
    address: "Wellington Pl, London NW8 9LE",
    latitude: 51.5283,
    longitude: -0.1685,
    rating: 7,
    imageUrl: "https://placehold.co/200x150",
    scanTypes: [ScanType.CT, ScanType.XRAY, ScanType.ULTRASOUND],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Portland Hospital",
    address: "205-209 Great Portland St, London W1W 5AH",
    latitude: 51.5198,
    longitude: -0.1436,
    rating: 8.5,
    imageUrl: "https://placehold.co/200x150",
    scanTypes: [ScanType.MRI, ScanType.CT, ScanType.XRAY, ScanType.ULTRASOUND],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function MapScreen(): React.JSX.Element {
  const { filters, setFilters, filteredCenters } =
    useFilteredCenters(DUMMY_CENTERS);

  return (
    <View style={styles.container}>
      <CenterFilters
        onFilterChange={setFilters}
        centerCount={filteredCenters.length}
      />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 51.5074,
          longitude: -0.1278,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {filteredCenters.map((center) => (
          <Marker
            key={center.id}
            coordinate={{
              latitude: center.latitude,
              longitude: center.longitude,
            }}
            title={center.name}
            description={center.address}
            onPress={() =>
              router.push({
                pathname: "/scan-center-details",
                params: { center: JSON.stringify(center) },
              })
            }
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
