import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { ProfileScreenProps } from "../../types";
import { useAuth } from "../../hooks/useAuth";

export const ProfileScreen = ({
  navigation,
}: ProfileScreenProps<"Profile">) => {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to FindMyScan</Text>
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.button}
            onPress={() =>
              navigation.navigate("Login", { returnTo: "Profile" })
            }
          >
            <Text style={styles.buttonText}>Login</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.secondaryButton]}
            onPress={() =>
              navigation.navigate("Register", { returnTo: "Profile" })
            }
          >
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
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
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("MyScansList")}
          >
            <Text style={styles.buttonText}>My Scans</Text>
          </Pressable>
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
};

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
