import { View, Text } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function OrderCard({ order }) {
  const date = new Date(order.orderTime);
  const options = {
    weekday: "long", // Full day name
    year: "numeric",
    month: "short", // Short month name (e.g., "Sep")
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true, // 12-hour format
  };

  const formattedDate = date.toLocaleDateString("en-US", options);

  const orderItems = Object.values(order.cart);

  const orderTexts = orderItems.map((item) => (
    <View
      key={item.id}
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between", // Ensure space between the two texts
        alignItems: "center", // Align items vertically in the center
        marginBottom: 5, // Optional: Add some space between rows
      }}
    >
      <Text style={{ flex: 1, color: Colors.primary }}>{item.count}</Text>
      <Text style={{ flex: 10, textAlign: "left" }}>{item.name}</Text>
    </View>
  ));

  return (
    <View
      style={{
        padding: 10,
        borderRadius: 15,
        backgroundColor: "#FFF",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {order.address.name}
        </Text>
        <Text
          style={{
            fontSize: 11,
            color: Colors.gray,
          }}
        >
          Delivered on: {formattedDate}
        </Text>
        <View
          style={{
            marginTop: 10,
          }}
        >
          {orderTexts}
        </View>
        <Text style={{ marginTop: 10 }}>Total: $ {order.total}</Text>
      </View>
      <View
        style={{
          alignSelf: "flex-start",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 3,
        }}
      >
        <Text
          style={{
            color: Colors.primary,
          }}
        >
          Re-order
        </Text>
        <Ionicons
          name="refresh-circle-outline"
          size={24}
          color={Colors.primary}
        />
      </View>
    </View>
  );
}
