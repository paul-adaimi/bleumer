import React, { useState, useRef, useCallback, useEffect } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../constants/Colors";
import PhoneInput from "react-native-phone-number-input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [error, setError] = useState("");
  const phoneInput = useRef(null);

  const router = useRouter();

  // Handle the button press
  const signInWithPhoneNumber = useCallback(async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(formattedValue);
      const verificationItems = {
        verificationId: confirmation._verificationId,
        phoneNumber: formattedValue,
      };
      await AsyncStorage.setItem(
        "verificationItems",
        JSON.stringify(verificationItems)
      );
      router.push("firebaseauth/confirmation");
    } catch (error) {
      setError(error.message);
    }
  }, [formattedValue]);

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
            name="phone-portrait-outline"
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
        Hi There!
      </Text>
      <Text
        style={{
          marginTop: 10,
          paddingHorizontal: 50,
          color: Colors.gray,
          textAlign: "center",
        }}
      >
        To start working with the app, we need you to verify your phone number.
        We will send you a verification code.
      </Text>
      <View style={{ marginTop: 20 }}>
        <PhoneInput
          ref={phoneInput}
          defaultValue={value}
          defaultCode="LB"
          layout="first"
          containerStyle={{
            width: "100%",
            fontSize: 16,
            borderColor: Colors.primary,
            borderWidth: 1,
            borderRadius: 15,
          }}
          textContainerStyle={{
            borderRadius: 15,
          }}
          onChangeText={(text) => {
            setError("");
            setValue(text);
          }}
          onChangeFormattedText={(text) => {
            setError("");
            setFormattedValue(text);
          }}
          withDarkTheme
          withShadow
          autoFocus
        />
      </View>
      {error ? (
        <Text style={{ color: "red", marginTop: 10 }}>{error}</Text>
      ) : null}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          const checkValid = phoneInput.current?.isValidNumber(value);
          if (!checkValid) {
            setError("Invalid phone number");
            return;
          } else {
            signInWithPhoneNumber();
          }
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#FFF",
            fontSize: 16,
            fontWeight: 600,
          }}
        >
          Verify Number
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
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
