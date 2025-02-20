import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Text,
} from "react-native";
import { Button } from "../../components/common/Button";
import { signUp } from "../../services/auth";
import { ProfileScreenProps } from "../../types";
import { isValidEmail, isValidName } from "../../utils/validation";

export const RegisterScreen = ({
  navigation,
}: ProfileScreenProps<"Register">) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    if (!email || !password || !fullName) {
      setError("All fields are required");
      return false;
    }
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!isValidName(fullName)) {
      setError("Name should contain only letters, no spaces");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    try {
      setError(null);
      if (!validateForm()) return;

      await signUp(email, password, fullName);
      // Reset navigation stack
      navigation.reset({
        index: 0,
        routes: [{ name: "Profile", params: { returnTo: "Profile" } }],
      });
    } catch (error: any) {
      setError(error.message || "Registration failed. Please try again.");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {error && <Text style={styles.errorText}>{error}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Enter your full name"
          placeholderTextColor="#666"
          value={fullName}
          onChangeText={setFullName}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your email address"
          placeholderTextColor="#666"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Choose a password"
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Create Account" onPress={handleRegister} />
        <Button
          title="Back to Login"
          onPress={() => navigation.navigate("Login", { returnTo: "Profile" })}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});
