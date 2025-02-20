import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Linking,
} from "react-native";
import type { ScanCenter } from "../../types";

type Props = {
  center: ScanCenter;
  onPress: () => void;
};

export const CenterCard = ({ center, onPress }: Props) => {
  const openInMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${center.latitude},${center.longitude}`;
    Linking.openURL(url);
  };

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: center.imageUrl }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{center.name}</Text>
        <Text style={styles.address}>{center.address}</Text>
        <View style={styles.footer}>
          <Text style={styles.rating}>⭐ {center.rating?.toFixed(1)}</Text>
          <Pressable onPress={openInMaps}>
            <Text style={styles.mapLink}>View in Maps →</Text>
          </Pressable>
        </View>
        {center.scanTypes && (
          <Text style={styles.scanTypes}>{center.scanTypes.join(", ")}</Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 300,
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  content: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    color: "#666",
  },
  scanTypes: {
    fontSize: 12,
    color: "#666",
  },
  mapLink: {
    color: "#007AFF",
    fontSize: 14,
  },
});
