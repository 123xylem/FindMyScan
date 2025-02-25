import React, { useEffect, useState } from "react";
import CenterCard from "../../components/centers/CenterCard";
import { useLocalSearchParams, router } from "expo-router";
import { StyleSheet, View, Text } from "react-native";
import type { ScanCenter } from "../../types";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { Stack } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function CenterScreen() {
  // Get parameters from the URL
  const { id } = useLocalSearchParams();
  const queryClient = useQueryClient();
  const centers = queryClient.getQueryData(["centers"]) || [];

  const center = Object.values(centers).filter((center) => center.id === id)[0];

  if (!center) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Center Details",
          headerShown: true,
          // headerBackVisible: true, // Explicitly show back button
          // If you need a custom back button:
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              color="#000"
              style={{ marginLeft: 8 }}
              onPress={() => router.back()}
            />
          ),
        }}
      />
      <View style={styles.container}>
        <CenterCard center={center} onPress={() => {}} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
