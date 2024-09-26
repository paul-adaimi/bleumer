import React, { forwardRef } from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

const CustomTextInput = forwardRef(
  ({ placeholder, error, style, containerStyle, ...props }, ref) => {
    return (
      <View style={[styles.container, containerStyle]}>
        <TextInput
          placeholder={placeholder}
          style={[styles.input, style, error && styles.errorInput]}
          ref={ref}
          {...props}
        />
        {error && <Text style={styles.errorText}>Error: {error}</Text>}
      </View>
    );
  }
);

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
    borderColor: Colors.primary,
  },
  errorText: {
    color: "red",
    marginTop: 5,
    fontSize: 14,
  },
  errorInput: {
    borderColor: "red",
  },
});

export default CustomTextInput;
