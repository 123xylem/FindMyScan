import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
  ActivityIndicator,
  Image,
} from "react-native";
import { Button } from "../../../../components/common/Button";
import { Input } from "../../../../components/common/Input";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { uploadScan } from "../../../../services/scans";
import { ScanType } from "../../../../types";
import { ProfileScreenProps } from "../../../../types";
import { Link, router } from "expo-router";
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/heic", // iOS format
  "image/heif", // iOS format
  "image/webp", // Android format
  "image/gif",
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function UploadScan(): React.JSX.Element {
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [scanType, setScanType] = useState<ScanType>(ScanType.XRAY);
  const [scanDate, setScanDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios");

  const getFileInfo = (file: any) => {
    const size = (file.fileSize / (1024 * 1024)).toFixed(2); // Convert to MB
    console.log(size, "FILE SIZE", file.width, file.height);

    const type = file.mimeType || "Unknown type";
    return `${file.fileName || "Image"} (${size}MB, ${type})`;
  };

  const validateAndSetFile = (asset: any): boolean => {
    // Single validation point for file checks
    if (asset.width > 5000 || asset.height > 11000) {
      setError("Image dimensions too large. Please choose a smaller image.");
      return false;
    }

    if (asset.fileSize > MAX_FILE_SIZE) {
      setError("File size must be less than 10MB");
      return false;
    }

    if (!ALLOWED_TYPES.includes(asset.mimeType)) {
      setError(
        "Please select a valid image file (JPEG, PNG, HEIC, HEIF, WebP, GIF)"
      );
      return false;
    }

    return true;
  };

  const pickImage = async () => {
    try {
      setLoading(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 0.3,
        base64: false,
        exif: false,
        allowsMultipleSelection: false,
        selectionLimit: 1,
        aspect: [4, 3],
      });

      if (!result.canceled) {
        setError(null);
        const asset = result.assets[0];

        if (validateAndSetFile(asset)) {
          setFile(asset);
        }
      }
    } catch (err) {
      setError("Failed to pick image");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!file || !scanType) {
        setError("Please select an image and scan type");
        return;
      }

      await uploadScan({
        file,
        scanType,
        scanDate,
        notes,
      });

      router.replace("upload");
    } catch (error: any) {
      setError(error.message || "Failed to upload scan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Upload Scan</Text>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.uploadSection}>
        <Button
          title={file ? "Change Image" : "Select Scan Image"}
          onPress={pickImage}
          variant="secondary"
          disabled={loading}
        />
        {file && (
          <>
            <Text style={styles.fileInfo}>{getFileInfo(file)}</Text>
            <Image
              source={{ uri: file.uri }}
              style={styles.previewImage}
              resizeMode="contain"
            />
          </>
        )}
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Scan Type</Text>
        <Picker
          selectedValue={scanType}
          onValueChange={(value) => setScanType(value)}
          style={styles.picker}
        >
          {Object.values(ScanType).map((type) => (
            <Picker.Item key={type} label={type} value={type} />
          ))}
        </Picker>
      </View>

      {Platform.OS === "android" ? (
        <Button
          title={`Select Date: ${scanDate.toLocaleDateString()}`}
          onPress={() => setShowDatePicker(true)}
        />
      ) : null}

      {showDatePicker && (
        <DateTimePicker
          value={scanDate}
          onChange={(_, date) => {
            setShowDatePicker(Platform.OS === "ios");
            if (date) setScanDate(date);
          }}
          mode="date"
        />
      )}

      <Input
        label="Notes"
        value={notes}
        onChangeText={setNotes}
        placeholder="Add any notes about your scan"
        multiline
        numberOfLines={4}
      />

      <View style={styles.buttonContainer}>
        <Button
          title={loading ? "Uploading..." : "Upload Scan"}
          onPress={handleUpload}
          disabled={loading}
        />
        <Link href="/(tabs)/profile/scans" asChild>
          <Button title="Go Back" onPress={() => {}} variant="secondary" />
        </Link>
      </View>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  uploadSection: {
    marginBottom: 24,
    alignItems: "center",
    padding: 20,
    borderWidth: 2,
    borderColor: "#ddd",
    borderStyle: "dashed",
    borderRadius: 12,
  },
  buttonContainer: {
    gap: 12,
    marginTop: 24,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  fileInfo: {
    marginTop: 8,
    color: "#666",
    textAlign: "center",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  previewImage: {
    width: "100%",
    height: 200,
    marginTop: 10,
    borderRadius: 8,
  },
});
