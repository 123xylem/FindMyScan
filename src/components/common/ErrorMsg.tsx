import { ActivityIndicator, Text, StyleSheet, View } from "react-native";

export const ErrorMessage = ({ message }: { message: string }) => (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    padding: 16,
    backgroundColor: "#ffebee",
    borderRadius: 8,
    marginVertical: 8,
  },
  errorText: {
    color: "#d32f2f",
    textAlign: "center",
  },
});
