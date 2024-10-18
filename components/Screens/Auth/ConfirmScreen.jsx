import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

export default function ConfirmScreen() {
  const [verificationItems, setVerificationItems] = useState(null);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  useEffect(() => {
    const loadVerificationItems = async () => {
      try {
        const savedVerificationItems = await AsyncStorage.getItem(
          "verificationItems"
        );
        if (savedVerificationItems) {
          setVerificationItems(JSON.parse(savedVerificationItems));
        }
      } catch (error) {
        console.error("Failed to load verification Id:", error);
      }
    };

    loadVerificationItems();
  }, []);

  async function confirmCode() {
    try {
      const verificationCode = code.join("");
      const credential = auth.PhoneAuthProvider.credential(
        verificationItems.verificationId,
        verificationCode
      );
      await auth().signInWithCredential(credential);
    } catch (error) {
      setError("The verification code is invalid.");
    }
  }

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
          {verificationItems?.phoneNumber}
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
          />
        ))}
      </View>

      {error && <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>}

      <TouchableOpacity style={styles.button} onPress={() => confirmCode()}>
        <Text
          style={{
            textAlign: "center",
            color: "#FFF",
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          Confirm Code
        </Text>
      </TouchableOpacity>
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

    // Shadow for iOS
    shadowColor: Colors.black,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 3,
    // Shadow for Android
    elevation: 5,
  },
  button: {
    width: "95%",
    marginTop: 20,
    backgroundColor: Colors.primary,
    padding: 14,
    borderRadius: 15,
    // Shadow for iOS
    shadowColor: Colors.black,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    // Shadow for Android
    elevation: 5,
  },
});
