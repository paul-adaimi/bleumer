import { View, Text, TouchableOpacity } from "react-native";
import React, { useMemo, useState, useEffect } from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Snackbar, Portal } from "react-native-paper";
import MiddleModalScreen from "@/components/Modals/MiddleModalScreen";

export default function OrderCard({
  order,
  onReorder,
  onRemoveItems,
  onCancelOrder,
  isFirst,
}) {
  const [reorderSnackbarVisible, setReorderSnackbarVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [isCanceling, setIsCanceling] = useState(false);
  const [dots, setDots] = useState("");

  useEffect(() => {
    let interval;
    if (isCanceling) {
      interval = setInterval(() => {
        setDots((prev) => (prev.length < 3 ? prev + "." : ""));
      }, 500);
    } else {
      setDots("");
    }

    return () => clearInterval(interval);
  }, [isCanceling]);

  const date = new Date(order.orderTime);
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
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

  const confirmCancelOrder = () => {
    setIsConfirmModalVisible(true);
  };

  const reorderAction = (
    <TouchableOpacity
      onPress={() => {
        setReorderSnackbarVisible(true);
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
  );

  const cancelAction = (
    <TouchableOpacity
      onPress={() => {
        confirmCancelOrder();
      }}
      disabled={isCanceling}
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
          color: isCanceling ? "#B86566" : "red",
        }}
      >
        {isCanceling ? `Cancelling Order ${dots}` : "Cancel Order"}
      </Text>
      {!isCanceling && <Ionicons name="ban" size={20} color={"red"} />}
    </TouchableOpacity>
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
          Status:{" "}
          <Text
            style={{
              color:
                order.status === "Pending"
                  ? "orange"
                  : order.status === "Cancelled"
                  ? "red"
                  : Colors.primary,
            }}
          >
            {order.status}
          </Text>
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
      {order.status === "Pending" ? cancelAction : reorderAction}

      <Portal>
        <Snackbar
          style={{
            backgroundColor: Colors.primary,
          }}
          visible={reorderSnackbarVisible}
          onDismiss={() => setReorderSnackbarVisible(false)}
          onIconPress={() => setReorderSnackbarVisible(false)}
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
      <MiddleModalScreen
        visible={isConfirmModalVisible}
        onClose={() => setIsConfirmModalVisible(false)}
        title="Cancel Order"
        button1Text="Back"
        button2Text="Cancel Order"
        button2Style={{ backgroundColor: "#FF3B30" }}
        onButton1Press={() => setIsConfirmModalVisible(false)}
        onButton2Press={async () => {
          setIsCanceling(true);
          setIsConfirmModalVisible(false);
          await onCancelOrder(order);
          setIsCanceling(false);
        }}
      >
        <Text>Are you sure you want to cancel your order?</Text>
      </MiddleModalScreen>
    </View>
  );
}
