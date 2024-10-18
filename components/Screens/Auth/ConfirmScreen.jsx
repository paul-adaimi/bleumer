import { View, TextInput, Button } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";

export default function ConfirmScreen() {
  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState("");
  const [verificationId, setVerificationId] = useState(null);

  useEffect(() => {
    auth().signOut();
    const loadVerificationId = async () => {
      try {
        const savedVerificationId = await AsyncStorage.getItem(
          "verificationId"
        );
        if (savedVerificationId) {
          setVerificationId(JSON.parse(savedVerificationId));
        }
      } catch (error) {
        console.error("Failed to load verification Id:", error);
      }
    };

    loadVerificationId();
  }, []);

  async function confirmCode() {
    try {
      const credential = auth.PhoneAuthProvider.credential(
        verificationId,
        code
      );
      await auth().signInWithCredential(credential);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={{ marginTop: 100 }}>
      <TextInput value={code} onChangeText={(text) => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </View>
  );
}
