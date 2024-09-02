import { View, Text } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function CheckoutCard({ children, title, style }) {
  return (
    <View
      style={{
        margin: 10,
        padding: 10,
        backgroundColor: Colors.white,
        borderRadius: 10,
        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        // Shadow for Android
        elevation: 5,
      }}
    >
      {title && (
        <Text style={{ fontSize: 15, fontWeight: "bold", paddingBottom: 15 }}>
          {title}
        </Text>
      )}
      <View style={style}>{children}</View>
    </View>
  );
}
