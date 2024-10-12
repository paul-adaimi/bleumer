import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Colors } from "@/constants/Colors";

const NumericInput = ({ value, onIncrement, onDecrement, disabled }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={disabled}
        style={{
          ...styles.button,
          borderTopLeftRadius: 4,
          borderBottomLeftRadius: 4,
        }}
        onPress={onDecrement}
      >
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <TextInput
        editable={false}
        style={styles.input}
        value={String(value)}
        keyboardType="numeric"
        color={Colors.primary}
      />
      <TouchableOpacity
        disabled={disabled}
        style={{
          ...styles.button,
          borderTopRightRadius: 4,
          borderBottomRightRadius: 4,
        }}
        onPress={onIncrement}
      >
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
    borderColor: Colors.primary,
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
    textAlign: "center",
    fontSize: 15,
  },
});

export default NumericInput;
