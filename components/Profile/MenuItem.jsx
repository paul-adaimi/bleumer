import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function MenuItem({ onPress, title, iconName }) {
  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        flex: 1,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        margin: 10,
        backgroundColor: "#FFF",
        borderColor: Colors.primary,
      }}
      onPress={onPress}
    >
      <View
        style={{
          borderRadius: 5,
          padding: 5,
          backgroundColor: Colors.primary,
        }}
      >
        <Ionicons name={iconName} size={40} color={Colors.white}></Ionicons>
      </View>
      <Text
        style={{
          fontSize: 17,
          fontWeight: "700",
          flex: 1,
          color: Colors.primary,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}
