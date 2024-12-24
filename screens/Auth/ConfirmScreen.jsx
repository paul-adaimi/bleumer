import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/components/AuthProvider";
import LoadingButton from "@/components/LoadingButton";
import { useNavigation } from "expo-router";

export default function ConfirmScreen() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const { signInWithPhoneNumber, confirmCode, verifyingNumber } = useAuth();

  confirmationCode = useMemo(() => {
    return code.join("");
  }, [code]);

  const handleInputChange = (text, index) => {
    setError("");

    // Check if the pasted text is the entire code
    if (text.length === 6) {
      console.log("Pasted text", text);
      const newCode = text.split("");
      setCode(newCode);

      // Move focus to the last input after paste
      inputRefs.current[5].focus();
    } else if (text.length > 1) {
      return;
    } else {
      // Handle single character input
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      // Move to the next input if a digit is entered
      if (text.length === 1 && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && code[index] === "" && index > 0) {
      // Clear the previous field and move focus back
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      inputRefs.current[index - 1].focus();
    }
  };

  handleSubmit = useCallback(async () => {
    setIsLoading(true);
    await confirmCode(confirmationCode, {
      onError: (error) => setError(error.message),
      onSuccess: ({ user }) => {
        if (!user?.displayName) {
          console.log("User has no display name");
          navigation.replace("enterName");
        } else {
          console.log("user has display name");
          navigation.goBack();
        }
      },
    });
    setIsLoading(false);
  }, [confirmationCode, confirmCode, navigation]);

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
              onKeyPress={(e) => handleKeyPress(e, index)}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
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

        <TouchableOpacity
          style={{
            marginTop: 20,
          }}
          disabled={countdown != 0}
          onPress={async () => {
            if (countdown == 0) {
              setCountdown(30);
              await signInWithPhoneNumber(verifyingNumber, {
                onError: (error) => setError(error.message),
              });
            }
          }}
        >
          <Text
            style={{
              color: countdown == 0 ? Colors.primary : Colors.primaryShade,
              fontWeight: 700,
            }}
          >
            Didn't receive the code? Resend Code{" "}
            {countdown != 0 ? `(in ${countdown} seconds)` : ""}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
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
