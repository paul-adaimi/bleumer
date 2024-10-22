import { View, TextInput, StyleSheet, Text } from "react-native";
import React, { useState, useRef, useMemo, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/components/AuthProvider";
import LoadingButton from "@/components/LoadingButton";

export default function ConfirmScreen() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(false);

  const { confirmCode, verifyingNumber } = useAuth();

  confirmationCode = useMemo(() => {
    return code.join("");
  }, [code]);

  const handleInputChange = (text, index) => {
    setError("");
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Move to the next input when a digit is entered
    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    // Move back to the previous input on delete
    if (text.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  handleSubmit = useCallback(async () => {
    setIsLoading(true);
    await confirmCode(confirmationCode, {
      onError: () => setError("Invalid Code"),
    });
    setIsLoading(false);
  }, [confirmationCode, confirmCode]);

  return (
    <View style={{ display: "flex", alignItems: "center", margin: 20 }}>
      <View
        style={{
          padding: 15,
          backgroundColor: Colors.primaryShade,
          borderRadius: 100,
        }}
      >
        <View
          style={{
            padding: 15,
            backgroundColor: Colors.primary,
            borderRadius: 100,
          }}
        >
          <Ionicons
            name="shield-checkmark-outline"
            size={100}
            color={Colors.white}
          />
        </View>
      </View>
      <Text
        style={{
          marginTop: 20,
          fontSize: 20,
          fontWeight: "bold",
          color: Colors.primary,
        }}
      >
        Verification Code
      </Text>
      <Text
        style={{
          marginTop: 10,
          paddingHorizontal: 50,
          color: Colors.gray,
          textAlign: "center",
        }}
      >
        Please enter Code sent to
        <Text style={{ fontWeight: "bold", color: Colors.primary }}>
          {" "}
          {verifyingNumber}
        </Text>
      </Text>
      <View style={styles.codeInputContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            value={digit}
            onChangeText={(text) => handleInputChange(text, index)}
            maxLength={1}
            keyboardType="number-pad"
            style={styles.input}
            autoFocus={index === 0}
          />
        ))}
      </View>

      {error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}

      <LoadingButton
        text="Confirm Code"
        onPress={handleSubmit}
        style={styles.button}
        isLoading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  codeInputContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.primary,
    padding: 10,
    textAlign: "center",
    fontSize: 18,
    width: 40,
    height: 50,
    color: Colors.primary,
    borderRadius: 5,

    // Shadow for iOS
    shadowColor: Colors.black,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    // Shadow for Android
    elevation: 0,
  },
  button: {
    width: "95%",
    marginTop: 20,
  },
});
