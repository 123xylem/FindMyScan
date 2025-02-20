import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

export type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  style?: ViewStyle;
  textStyle?: TextStyle;
  disabled?: boolean;
};

export const Button = ({
  onPress,
  title,
  variant = "primary",
  style,
  textStyle,
  disabled,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "secondary" ? styles.secondaryButton : styles.primaryButton,
        style,
        disabled && styles.buttonDisabled,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.text,
          variant === "secondary" ? styles.secondaryText : styles.primaryText,
          textStyle,
          disabled && styles.textDisabled,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: "#007AFF",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  primaryText: {
    color: "#FFFFFF",
  },
  secondaryText: {
    color: "#007AFF",
  },
  buttonDisabled: {
    backgroundColor: "#CCCCCC",
  },
  textDisabled: {
    color: "#999999",
  },
});
