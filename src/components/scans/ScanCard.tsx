import React from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { UserScan } from "../../types/models";
import { formatDate } from "../../utils/date";
import { ScanPreview } from "../ScanPreview";
import { deleteScan } from "../../services/scans";
import { Button } from "../common/Button";

interface ScanCardProps {
  scan: UserScan;
  onPress?: () => void;
  onEdit: (scan: UserScan) => void;
  onDelete: (scan: UserScan) => Promise<void>;
}

export const ScanCard = ({
  scan,
  onPress,
  onEdit,
  onDelete,
}: ScanCardProps) => {
  const handleDelete = () => {
    Alert.alert("Delete Scan", "Are you sure you want to delete this scan?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => onDelete(scan),
      },
    ]);
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <ScanPreview url={scan.fileUrl} size={150} />

      <View style={styles.header}>
        <Text style={styles.date}>{formatDate(scan.scanDate)}</Text>
        <Text style={styles.type}>{scan.scanType}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.notes} numberOfLines={2}>
          {scan.notes || "No notes"}
        </Text>
      </View>
      <View style={styles.actions}>
        <Button title="Edit" onPress={() => onEdit(scan)} variant="secondary" />
        <Button title="Delete" onPress={handleDelete} variant="secondary" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: "#666",
  },
  type: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    marginTop: 8,
  },
  notes: {
    fontSize: 14,
    color: "#444",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
});
