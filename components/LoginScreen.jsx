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

WebBrowser.maybeCompleteAuthSession();

const screenWidth = Dimensions.get("window").width;

export default function LoginScreen() {
  const { setIsInTour } = useTour();
  useEffect(() => {
    setIsInTour(true);
  }, []);
  useWarmUpBrowser();
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

  return (
    <View style={{ height: "100%", backgroundColor: "#FFF", padding: 30 }}>
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
          source={require("./../assets/images/bleumer-logo.jpg")}
        />
        <Image
          style={{
            width: 220,
            height: 450,
            borderRadius: 20,
            borderWidth: 6,
            borderColor: "#000",
          }}
          source={require("./../assets/images/homepage-full.png")}
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
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={{ textAlign: "center", color: "#FFF" }}>
            {" "}
            Let's Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    marginTop: -20,
    elevation: 1,
    backgroundColor: "#FFF",
    paddingTop: 20,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 99,
    marginTop: 50,
  },
});
