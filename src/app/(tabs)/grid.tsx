import React from "react";
import { StyleSheet, View, ScrollView, Platform } from "react-native";
import { AppScreenProps } from "../../types";
import type { ScanCenter } from "../../types";
import { ScanType } from "../../types";
import { CenterFilters } from "../../components/centers/CenterFilters";
import CenterCard from "../../components/centers/CenterCard";
import { useFilteredCenters } from "../../hooks/useFilteredCenters";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCenters } from "../../services/centers";
import { Loading } from "../../components/common/Loading";
import { ErrorMessage } from "../../components/common/ErrorMsg";
import type { FilterOptions } from "../../components/centers/CenterFilters";
import { router } from "expo-router";

export default function GridScreen(): React.JSX.Element {
  const queryClient = useQueryClient();
  const {
    data: centers = [],
    isLoading,
    error,
  } = useQuery<ScanCenter[]>({
    queryKey: ["centers"],
    queryFn: getCenters,
  });

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
                router.push({
                  pathname: `/centers/${center.id}`,
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
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
