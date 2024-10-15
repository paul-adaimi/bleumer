import React, { useState, useEffect } from "react";
import { Button, TextInput, View } from "react-native";
import auth from "@react-native-firebase/auth";

export default function PhoneSignIn() {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState("");

  // Handle login
  function onAuthStateChanged(user) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    // auth().signOut();
    console.log(auth().currentUser);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    console.log("sending code to: ", phoneNumber);
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      console.log(confirmation);
      setConfirm(confirmation);
    } catch (error) {
      console.log("Phone number not valid.", error.message);
    }
    // const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    // console.log(confirmation);
    // setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm.confirm(code);
    } catch (error) {
      console.log("Invalid code.");
    }
  }

  if (!confirm) {
    return (
      <View style={{ marginTop: 50 }}>
        <Button
          title="Phone Number Sign In"
          onPress={() => signInWithPhoneNumber("+96181694342")}
        />
      </View>
    );
  }

  return (
    <View style={{ marginTop: 100 }}>
      <TextInput value={code} onChangeText={(text) => setCode(text)} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </View>
  );
}
