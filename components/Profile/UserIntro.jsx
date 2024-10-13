import { View, Text } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "@/constants/Colors";
import { Image } from "react-native-expo-image-cache";

export default function UserIntro() {
  const { user } = useUser();
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
        uri={user?.imageUrl}
        style={{
          width: 100,
          height: 100,
          borderRadius: 99,
          borderWidth: 3,
          borderColor: Colors.primary,
        }}
      />
      <Text style={{ fontWeight: "bold", fontSize: 20, color: Colors.primary }}>
        {user.fullName}
      </Text>
      <Text style={{ fontSize: 16, color: Colors.primary }}>
        {user?.primaryEmailAddress.emailAddress}
      </Text>
    </View>
  );
}
