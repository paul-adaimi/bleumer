import { View, Text, TouchableOpacity } from "react-native";
import React, { useMemo, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Snackbar, Portal } from "react-native-paper";

export default function OrderCard({
  order,
  onReorder,
  onRemoveItems,
  isFirst,
}) {
  const [portalSnackbarVisible, setPortalSnackbarVisible] = useState(false);

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
        marginBottom: 5,
      }}
    >
      <Text style={{ flex: 1, color: Colors.primary }}>{item.count}</Text>
      <Text style={{ flex: 10, textAlign: "left" }}>{item.name}</Text>
    </View>
  ));

  const allItemsCount = useMemo(
    () => orderItems.reduce((total, item) => (total += item.count), 0),
    [orderItems]
  );

  return (
    <View
      style={{
        padding: 10,
        borderRadius: 15,
        backgroundColor: "#FFF",
        display: "flex",
        flexDirection: "row",
        marginTop: isFirst ? 10 : 0,
        marginBottom: 10,
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
          Ordered on: {formattedDate}
        </Text>
        <Text
          style={{
            marginTop: 5,
            fontSize: 13,
            color: Colors.primaryLight,
          }}
        >
          Status: {order.status}
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
      <TouchableOpacity
        onPress={() => {
          setPortalSnackbarVisible(true);
          onReorder(order);
        }}
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
          Add to cart
        </Text>
        <Ionicons
          name="refresh-circle-outline"
          size={24}
          color={Colors.primary}
        />
      </TouchableOpacity>

      <Portal>
        <Snackbar
          style={{
            backgroundColor: Colors.primary,
          }}
          visible={portalSnackbarVisible}
          onDismiss={() => setPortalSnackbarVisible(false)}
          onIconPress={() => setPortalSnackbarVisible(false)}
          action={{
            label: "undo",
            onPress: () => {
              onRemoveItems(order);
            },
            style: {
              backgroundColor: Colors.primary,
            },
            labelStyle: {
              color: Colors.primaryShade,
              fontSize: 16,
            },
          }}
        >
          <Text
            style={{
              color: "#FFF",
            }}
          >
            {allItemsCount} {allItemsCount == 1 ? "item" : "items"} added to
            cart
          </Text>
        </Snackbar>
      </Portal>
    </View>
  );
}
