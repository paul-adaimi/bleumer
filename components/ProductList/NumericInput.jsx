import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { Colors } from "@/constants/Colors";

const NumericInput = () => {
  const [value, setValue] = useState(0);

  const increment = () => {
    setValue((prevValue) => prevValue + 1);
  };

  const decrement = () => {
    setValue((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={decrement}>
        <Text style={styles.buttonText}>-</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        value={String(value)}
        onChangeText={(text) => setValue(parseInt(text) || 0)}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={increment}>
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
