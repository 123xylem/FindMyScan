import React from "react";
import { StyleSheet, View, ScrollView, Platform } from "react-native";
import { AppScreenProps } from "../../types";
import type { ScanCenter } from "../../types";
import { ScanType } from "../../types";
import { CenterFilters } from "./CenterFilters";
import { CenterCard } from "./CenterCard";
import { useFilteredCenters } from "../../hooks/useFilteredCenters";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCenters } from "../../services/centers";
import { Loading } from "../../components/common/Loading";
import { ErrorMessage } from "../../components/common/ErrorMsg";
import type { FilterOptions } from "./CenterFilters";
// Dummy data for scan centers
const DUMMY_CENTERS: ScanCenter[] = [
  {
    id: "2",
    name: "London Bridge Hospital",
    address: "27 Tooley St, London SE1 2PR",
    latitude: 51.5045,
    longitude: -0.0865,
    rating: 9.6,
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
    rating: 7.5,
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
    rating: 8,
    imageUrl: "https://placehold.co/200x150",
    scanTypes: [ScanType.MRI, ScanType.CT, ScanType.XRAY, ScanType.ULTRASOUND],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const GridScreen = ({ navigation }: AppScreenProps<"Grid">) => {
  const queryClient = useQueryClient();
  const {
    data: centers = [],
    isLoading,
    error,
  } = useQuery<ScanCenter[]>({
    queryKey: ["centers"],
    queryFn: getCenters,
  });
  console.log(DUMMY_CENTERS.length, centers?.length);
  const { setFilters, filteredCenters, filteredCount } =
    useFilteredCenters(centers);

  const handleFilterChange = (newFilters: FilterOptions) => {
    // Invalidate and refetch when filters change
    queryClient.invalidateQueries({ queryKey: ["centers"] });
    setFilters(newFilters);
  };

  if (isLoading) return <Loading />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <View style={[styles.container]}>
      <CenterFilters
        onFilterChange={handleFilterChange}
        centerCount={filteredCount}
      />
      <ScrollView
        style={[styles.scrollView, Platform.select({ web: styles.webContent })]}
      >
        <View style={styles.grid}>
          {filteredCenters.map((center) => (
            <CenterCard
              key={center.id}
              center={center}
              onPress={() =>
                navigation.navigate("ScanCenterDetails", { center })
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  grid: {
    padding: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  webLayout: {
    flexDirection: "row",
  },
  webContent: {
    flex: 1,
  },
});
