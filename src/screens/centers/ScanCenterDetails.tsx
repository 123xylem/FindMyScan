import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Button } from "../../components/common/Button";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../types/index";

type Props = NativeStackScreenProps<AppStackParamList, "ScanCenterDetails">;

export const ScanCenterDetails = ({ route, navigation }: Props) => {
  const id =
    "centerId" in route.params ? route.params.centerId : route.params.center.id;
  // Dummy data - in real app, fetch from API/database
  const centerDetails = {
    id,
    name: "City Medical Imaging",
    address: "123 Medical Ave, City",
    rating: 4.5,
    phone: "+1 (555) 123-4567",
    email: "info@citymedicalimaging.com",
    services: [
      { name: "MRI Scan", price: 299 },
      { name: "CT Scan", price: 199 },
      { name: "X-Ray", price: 99 },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{centerDetails.name}</Text>
        <Text style={styles.rating}>⭐ {centerDetails.rating.toFixed(1)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <Text style={styles.info}>{centerDetails.address}</Text>
        <Text style={styles.info}>{centerDetails.phone}</Text>
        <Text style={styles.info}>{centerDetails.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Services</Text>
        {centerDetails.services.map((service, index) => (
          <View key={index} style={styles.serviceItem}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <Text style={styles.servicePrice}>${service.price}</Text>
          </View>
        ))}
      </View>

      <Button
        title="Book Appointment"
        onPress={() => navigation.navigate("UploadScan")}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  rating: {
    fontSize: 18,
    color: "#666",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  info: {
    fontSize: 16,
    color: "#444",
    marginBottom: 8,
  },
  serviceItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  serviceName: {
    fontSize: 16,
    color: "#444",
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: "500",
    color: "#007AFF",
  },
});
