import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Text,
} from "react-native";
import { ScanCard } from "../../../../components/scans/ScanCard";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../../types/index";
import { Button } from "../../../../components/common/Button";
import { ProfileScreenProps } from "../../../../types";
import { getUserScans, deleteScan } from "../../../../services/scans";
import type { UserScan } from "../../../../types/models";
import { EditScanModal } from "../../../../components/scans/EditScanModal";
import { Link } from "expo-router";
type Props = NativeStackScreenProps<
  AppStackParamList,
  "MyScansList",
  "ScanCenterDetails"
>;

// Dummy data for testing
const DUMMY_SCANS = [
  {
    id: "1",
    userId: "user123",
    scanTypeId: "mri_scan",
    scanCenterId: "center1",
    scanDate: "2024-03-15",
    fileUrl: "https://example.com/scan1.pdf",
    notes: "Annual checkup MRI",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  // ... more scans
];

export default function MyScansList(): React.JSX.Element {
  const [scans, setScans] = useState<UserScan[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [editingScan, setEditingScan] = useState<UserScan | null>(null);

  const loadScans = async () => {
    try {
      setLoading(true);
      const data = await getUserScans();
      console.log("Loaded scans:", data);
      setScans(data);
    } catch (error) {
      console.error("Load scans error:", error);
      Alert.alert("Error", "Failed to load scans");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadScans();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadScans();
  };

  const handleDelete = async (scan: UserScan) => {
    try {
      setLoading(true);
      await deleteScan(scan.id, scan.filePath);

      // Optimistically remove from list
      setScans((prev) => prev.filter((s) => s.id !== scan.id));
    } catch (error) {
      console.error("Delete error:", error);
      Alert.alert("Error", "Failed to delete scan");
      // Reload scans if delete failed
      loadScans();
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (scan: UserScan) => {
    setEditingScan(scan);
  };

  const handleUpdate = (updatedScan: UserScan) => {
    setScans((prev) =>
      prev.map((scan) => (scan.id === updatedScan.id ? updatedScan : scan))
    );
    setEditingScan(null);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Link href="/(tabs)/profile/scans/upload" asChild>
        <Button
          title="Upload New Scan"
          onPress={() => {}}
          style={styles.uploadButton}
        />
      </Link>
      <FlatList
        data={scans}
        renderItem={({ item }) => (
          <ScanCard
            scan={item}
            onPress={() => {
              /* Handle scan preview */
            }}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>No scans yet</Text>
        )}
      />

      {editingScan && (
        <EditScanModal
          scan={editingScan}
          visible={true}
          onClose={() => setEditingScan(null)}
          onUpdate={handleUpdate}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  uploadButton: {
    margin: 16,
  },
  list: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
    marginTop: 20,
  },
});
