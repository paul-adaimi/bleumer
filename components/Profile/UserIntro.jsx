import { View, Text } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Image } from "react-native-expo-image-cache";
import { useAuth } from "@/components/AuthProvider";

export default function UserIntro() {
  const { currentUser } = useAuth();
  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
      }}
    >
      <Image
        uri={currentUser?.photoURL}
        style={{
          width: 100,
          height: 100,
          borderRadius: 99,
          borderWidth: 3,
          borderColor: Colors.primary,
        }}
      />
      <Text style={{ fontWeight: "bold", fontSize: 20, color: Colors.primary }}>
        {currentUser.displayName}
      </Text>
      <Text style={{ fontSize: 16, color: Colors.primary }}>
        {currentUser.phoneNumber}
      </Text>
    </View>
  );
}
