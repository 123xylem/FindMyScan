import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Platform,
  Modal,
  TextInput,
  Animated,
} from "react-native";
import Slider from "@react-native-community/slider";
import type { ScanCenter } from "../../types";
import { ScanType, Coordinates } from "../../types/models";
import { getPlaceSuggestions, PlaceSuggestion } from "../../utils/geocoding";

type Props = {
  onFilterChange: (filters: FilterOptions) => void;
  centerCount: number;
};

export type FilterOptions = {
  minRating: number;
  maxDistance: number;
  scanTypes: ScanType[];
  userLocation: Coordinates;
};

export const CenterFilters = ({ onFilterChange, centerCount }: Props) => {
  const [minRating, setMinRating] = React.useState(0);
  const [maxDistance, setMaxDistance] = React.useState(10);
  const [selectedScans, setSelectedScans] = React.useState<ScanType[]>([]);
  const [userLocation, setUserLocation] = useState<Coordinates>({
    latitude: 51.5074, // Default London
    longitude: -0.1278,
  });
  const [locationInput, setLocationInput] = useState("");
  const [locationError, setLocationError] = useState("");
  const [isExpanded, setIsExpanded] = useState(true);
  const [animation] = useState(new Animated.Value(1));
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const scanTypes = Object.values(ScanType);

  const updateFilters = () => {
    //when filters are updated, update the filters in  the GridScreen
    onFilterChange({
      minRating,
      maxDistance,
      scanTypes: selectedScans,
      userLocation,
    });
  };

  const toggleFilters = () => {
    Animated.timing(animation, {
      toValue: isExpanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsExpanded(!isExpanded);
  };

  const handleLocationInput = async (text: string) => {
    setLocationInput(text);
    if (text.length > 2) {
      const places = await getPlaceSuggestions(text);
      setSuggestions(places);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectPlace = (place: PlaceSuggestion) => {
    setLocationInput(`${place.name}${place.area ? `, ${place.area}` : ""}`);
    setUserLocation({
      latitude: place.latitude,
      longitude: place.longitude,
    });
    setShowSuggestions(false);
    updateFilters();
    toggleFilters();
  };

  return (
    <View style={styles.wrapper}>
      <Pressable onPress={toggleFilters} style={styles.header}>
        <View style={styles.headerContent}>
          {/* <Text style={styles.title}>Filter Centers</Text> */}
          <Text style={styles.count}>{centerCount} centers found</Text>
        </View>
        <Text>{isExpanded ? "▼" : "▲"}</Text>
      </Pressable>

      <Animated.View
        style={[
          styles.container,
          {
            maxHeight: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 500],
            }),
            opacity: animation,
            overflow: "scroll",
          },
        ]}
      >
        <View style={styles.section}>
          <Text>Minimum Rating: {minRating.toFixed(0.5)}⭐</Text>
          <Slider
            value={minRating}
            onValueChange={setMinRating}
            maximumValue={10}
            minimumValue={0}
            step={0.5}
            onSlidingComplete={updateFilters}
          />
        </View>

        <View style={styles.section}>
          <Text>Max Distance: {maxDistance}km</Text>
          <Slider
            value={maxDistance}
            onValueChange={setMaxDistance}
            maximumValue={50}
            minimumValue={1}
            step={1}
            onSlidingComplete={updateFilters}
          />
        </View>

        <View style={styles.section}>
          <Text>Location:</Text>
          <View style={styles.locationContainer}>
            <TextInput
              style={styles.locationInput}
              value={locationInput}
              onChangeText={handleLocationInput}
              placeholder="Enter location (e.g., Camden, London)"
            />
          </View>
          {showSuggestions && suggestions.length > 0 && (
            <View style={styles.suggestions}>
              {suggestions.map((place, index) => (
                <Pressable
                  key={index}
                  style={styles.suggestion}
                  onPress={() => selectPlace(place)}
                >
                  <Text>{place.name}</Text>
                  {place.area && (
                    <Text style={styles.area}>, {place.area}</Text>
                  )}
                </Pressable>
              ))}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.subtitle}>Required Scan Types:</Text>
          <View style={styles.scanTypes}>
            {scanTypes.map((scan) => (
              <Pressable
                key={scan}
                style={[
                  styles.scanType,
                  selectedScans.includes(scan) && styles.selectedScan,
                ]}
                onPress={() => {
                  const updated = selectedScans.includes(scan)
                    ? selectedScans.filter((s) => s !== scan)
                    : [...selectedScans, scan];
                  setSelectedScans(updated);
                  onFilterChange({
                    minRating,
                    maxDistance,
                    scanTypes: updated,
                    userLocation,
                  });
                }}
              >
                <Text
                  style={selectedScans.includes(scan) && styles.selectedText}
                >
                  {scan}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  header: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  section: {
    marginBottom: 8,
  },
  subtitle: {
    marginBottom: 8,
  },
  scanTypes: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  scanType: {
    padding: 6,
    borderRadius: 12,
    backgroundColor: "#f0f0f0",
  },
  selectedScan: {
    backgroundColor: "#007AFF",
  },
  locationContainer: {
    position: "relative",
    zIndex: 1000,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },
  locationInput: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "white",
  },
  searchButton: {
    padding: 12,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    minWidth: 80,
    alignItems: "center",
  },
  searchButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginTop: 4,
    fontSize: 12,
  },
  selectedText: {
    fontWeight: "bold",
  },
  suggestions: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
    elevation: 1000,
  },
  suggestion: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    flexDirection: "row",
  },
  area: {
    color: "#666",
  },
  headerContent: {
    flex: 1,
  },
  count: {
    color: "#666",
    fontSize: 14,
  },
});
