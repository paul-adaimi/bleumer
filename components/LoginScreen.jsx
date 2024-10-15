import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
import { Colors } from "@/constants/Colors";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import { useTour } from "./TourProvider";
import { useNavigation } from "expo-router";

WebBrowser.maybeCompleteAuthSession();

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default function LoginScreen() {
  const { setIsInTour } = useTour();
  useEffect(() => {
    setIsInTour(true);
  }, []);
  useWarmUpBrowser();

  // const navigation = useNavigation();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/dashboard", { scheme: "myapp" }),
        });

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  // const onPress = React.useCallback(async () => {
  //   // go to phone sign in
  //   navigation.navigate("phoneSignIn");
  // }, [navigation]);

  return (
    <View
      style={{ flex: 1, height: "100%", backgroundColor: "#FFF", padding: 30 }}
    >
      <View
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: screenWidth - 80,
            resizeMode: "contain",
          }}
          source={require("@/assets/images/bleumer-logo.jpg")}
        />
        <Image
          style={{
            width: screenWidth - 200,
            height: screenHeight / 2,
            borderRadius: 20,
            borderWidth: 6,
            borderColor: "#000",
          }}
          source={require("@/assets/images/homepage-full.png")}
        />
      </View>
      <View style={styles.subContainer}>
        <Text style={{ fontSize: 30, textAlign: "center" }}>
          Your ultimate
          <Text style={{ color: Colors.primary }}> Salmon </Text>
        </Text>
        <Text style={{ fontSize: 30, textAlign: "center" }}>
          <Text style={{ color: Colors.primary }}>Delivery </Text>application
        </Text>
        <Text
          style={{
            fontSize: 15,
            textAlign: "center",
            marginVertical: 15,
            color: Colors.gray,
            marginTop: 50,
          }}
        >
          Sustainably sourced salmon, delivered fresh to your door. Quality
          seafood you can trust.
        </Text>
      </View>
      <View
        style={{
          position: "absolute",
          width: "100%",
          bottom: 30,
          left: 30,
        }}
      >
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={{ textAlign: "center", color: "#FFF" }}>
            Let's Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    marginTop: -screenHeight / 8,
    backgroundColor: "#FFF",
    paddingTop: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 99,
  },
});
