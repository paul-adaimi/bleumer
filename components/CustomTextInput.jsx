import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

const CustomTextInput = ({ placeholder, error, style, ...props }) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        style={[styles.input, style, error && styles.errorInput]}
        {...props}
      />
      {error && <Text style={styles.errorText}>Error: {error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 17,
    backgroundColor: "#FFF",
    borderColor: "#007BFF", // Replace this with Colors.primary if you have a color palette
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 5,
    fontSize: 14,
  },
});

export default CustomTextInput;
