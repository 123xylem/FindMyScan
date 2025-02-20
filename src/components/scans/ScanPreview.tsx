import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, ActivityIndicator } from "react-native";

type ScanPreviewProps = {
  url: string;
  size?: number;
};

export const ScanPreview = ({ url, size = 200 }: ScanPreviewProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Debug URL issues
  useEffect(() => {
    console.log("Preview URL:", url);
    fetch(url)
      .then((response) => {
        console.log("URL Status:", response.status);
        if (!response.ok) console.log("URL Error:", response.statusText);
      })
      .catch((err) => console.log("URL Fetch Error:", err));
  }, [url]);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Image
        source={{ uri: url }}
        style={[styles.image, { width: size, height: size }]}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={(e) => {
          console.log("Image Load Error:", e.nativeEvent.error);
          setError(true);
        }}
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  image: {
    borderRadius: 8,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.5)",
  },
});
