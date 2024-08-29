import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Colors } from "@/constants/Colors";

const NumericInput = ({ value, onIncrement, onDecrement }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onDecrement}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={String(value)}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={onIncrement}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    width: 100,
    height: 30,
  },
  button: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
  input: {
    flex: 1,
    height: 40,
    textAlign: "center",
    fontSize: 15,
  },
});

export default NumericInput;
