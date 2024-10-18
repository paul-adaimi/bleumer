import { View, TextInput, Button } from "react-native";
import React, { useState } from "react";
import { useAuth } from "@/components/AuthProvider";

export default function ConfirmScreen() {
  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState("");

  const { confirmation } = useAuth();

  async function confirmCode() {
    try {
      await confirmation.confirm(code);
    } catch (error) {
      console.log("Invalid code.");
    }
  }

  return (
    <View style={{ marginTop: 100 }}>
      <TextInput value={code} onChangeText={(text) => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </View>
  );
}
