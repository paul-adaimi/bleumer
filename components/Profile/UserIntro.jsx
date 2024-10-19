import { View, Text } from "react-native";
import React, { useMemo } from "react";
import { Colors } from "@/constants/Colors";
import { Image } from "react-native-expo-image-cache";
import { useAuth } from "@/components/AuthProvider";

export default function UserIntro() {
  const { currentUser } = useAuth();

  const firstTwoChars = useMemo(() => {
    // Split the string into an array of words by spaces
    const words = currentUser.displayName.trim().split(/\s+/);

    // Get the first character of the first word (always exists if string is not empty)
    const firstChar1 = words[0].charAt(0).toUpperCase();

    // Check if there's a second word
    if (words.length > 1) {
      const firstChar2 = words[1].charAt(0).toUpperCase();
      return firstChar1 + firstChar2;
    } else {
      return firstChar1; // Return only the first character if there's only one word
    }
  }, [currentUser.displayName]);

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
      }}
    >
      <View
        style={{
          width: 100,
          height: 100,
          borderRadius: 99,
          borderWidth: 5,
          borderColor: Colors.primary,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 30,
            color: Colors.primary,
            marginLeft: 5,
            textAlign: "center",
            letterSpacing: 5,
          }}
        >
          {firstTwoChars}
        </Text>
      </View>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          color: Colors.primary,
          marginTop: 10,
        }}
      >
        {currentUser.displayName}
      </Text>
      <Text style={{ fontSize: 16, color: Colors.primary }}>
        {currentUser.phoneNumber}
      </Text>
    </View>
  );
}
