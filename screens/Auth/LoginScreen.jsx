import React, { useState, useRef, useCallback } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import PhoneInput from "react-native-phone-number-input";
import { useAuth } from "@/components/AuthProvider";
import { useNavigation } from "expo-router";
import LoadingButton from "@/components/LoadingButton";

export default function LoginScreen() {
  const [value, setValue] = useState("");
  const [formattedValue, setFormattedValue] = useState("");
  const [error, setError] = useState("");
  const phoneInput = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const { signInWithPhoneNumber } = useAuth();

  const onPressButton = useCallback(async () => {
    setIsLoading(true);
    const checkValid = phoneInput.current?.isValidNumber(value);
    if (!checkValid) {
      setError("Invalid phone number");
    } else {
      await signInWithPhoneNumber(formattedValue, {
        onSuccess: () => navigation.replace("confirmation"),
        onError: (error) => setError(error.message),
      });
    }
    setIsLoading(false);
  }, [value, formattedValue, signInWithPhoneNumber]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
          To start working with the app, we need you to verify your phone
          number. We will send you a verification code.
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
              borderColor: error ? "red" : Colors.primary,
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
        <LoadingButton
          text="Verify Number"
          onPress={onPressButton}
          style={styles.button}
          isLoading={isLoading}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginTop: 20,
  },
});
