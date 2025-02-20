import React, { useState } from "react";
import {
  View,
  Modal,
  StyleSheet,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Text,
} from "react-native";
import { Button } from "../common/Button";
import { Picker } from "@react-native-picker/picker";
import { ScanType, UserScan } from "../../types/models";
import { updateScan } from "../../services/scans";

type Props = {
  scan: UserScan;
  visible: boolean;
  onClose: () => void;
  onUpdate: (updatedScan: UserScan) => void;
};

export const EditScanModal = ({ scan, visible, onClose, onUpdate }: Props) => {
  const [scanType, setScanType] = useState(scan.scanType);
  const [notes, setNotes] = useState(scan.notes || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const updated = await updateScan(scan.id, {
        scan_type: scanType,
        notes,
      });
      onUpdate({ ...scan, scanType, notes });
      onClose();
    } catch (error) {
      Alert.alert("Error", "Failed to update scan");
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropPress = () => {
    Keyboard.dismiss();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.content, styles.shadow]}>
              <Text style={styles.title}>Edit Scan</Text>

              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={scanType}
                  onValueChange={setScanType}
                  style={styles.picker}
                  itemStyle={styles.pickerItem}
                  mode="dropdown"
                >
                  {Object.values(ScanType).map((type) => (
                    <Picker.Item
                      key={type}
                      label={type}
                      value={type}
                      color="#000"
                    />
                  ))}
                </Picker>
              </View>

              <TextInput
                value={notes}
                onChangeText={setNotes}
                placeholder="Add notes"
                placeholderTextColor="#666"
                multiline
                style={styles.input}
              />

              <View style={styles.buttons}>
                <Button title="Cancel" onPress={onClose} variant="secondary" />
                <Button
                  title={loading ? "Updating..." : "Update"}
                  onPress={handleUpdate}
                  disabled={loading}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingTop: 100,
    paddingHorizontal: 20,
  },
  content: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    width: "100%",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 20,
    color: "#000",
  },
  pickerContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    marginBottom: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  picker: {
    height: 50,
    color: "#000",
    backgroundColor: "#f0f0f0",
  },
  pickerItem: {
    fontSize: 16,
    height: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    minHeight: 100,
    color: "#000",
    backgroundColor: "#fff",
    textAlignVertical: "top",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
});
