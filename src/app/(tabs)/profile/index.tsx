import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useAuth } from "../../../hooks/useAuth";
import { Link } from "expo-router";

export default function ProfileScreen(): React.JSX.Element {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to FindMyScan!</Text>
        <View style={styles.buttonContainer}>
          <Link href="/(auth)/login" asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Login!</Text>
            </Pressable>
          </Link>

          <Link href="/(auth)/register" asChild>
            <Pressable style={{ ...styles.button, ...styles.secondaryButton }}>
              <Text style={styles.buttonText}>Register!</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Text style={styles.name}>{user?.full_name || "User"}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>
      <View style={styles.buttonContainer}>
        {isAuthenticated && (
          <Link href="/(tabs)/profile/scans" asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>My Scans</Text>
            </Pressable>
          </Link>
        )}
        <Pressable
          style={[styles.button, styles.dangerButton]}
          onPress={logout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </View>
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
    marginBottom: 32,
    textAlign: "center",
  },
  buttonContainer: {
    gap: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: "#5856D6",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  profile: {
    marginBottom: 32,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: "#666",
  },
  dangerButton: {
    backgroundColor: "#FF3B30",
  },
});
