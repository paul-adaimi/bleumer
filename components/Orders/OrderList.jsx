import { View, FlatList, Text } from "react-native";
import React, { useState } from "react";
import OrderCard from "./OrderCard";
import { useCart } from "@/components/CartProvider";
import { Portal, Snackbar } from "react-native-paper";
import { useAuth } from "@/components/AuthProvider";
import { useSnackbar } from "@/components/SnackbarProvider";

export default function OrderList({ orders }) {
  const { setSnackbarData } = useSnackbar();
  const [cancelSnackbarVisible, setCancelSnackbarVisible] = useState(false);
  const { cart, addToCart, updateItemCount } = useCart();

  const { currentUser } = useAuth();

  const onReorder = (order) => {
    for (let cartItem of Object.values(order.cart)) {
      addToCart(cartItem.id, { ...cartItem });
    }
  };

  const onRemoveItems = (order) => {
    for (let cartItem of Object.values(order.cart)) {
      const oldCount = cart[cartItem.id].count;
      updateItemCount(cartItem.id, oldCount - cartItem.count);
    }
  };

  // TODO: Handle error + test
  const onCancelOrder = async (order) => {
    try {
      // Get the current user and their ID token
      const idToken = await currentUser.getIdToken();

      // Call the Firebase function 'cancelOrder'
      const response = await fetch(
        "https://europe-west1-bleumer-d477c.cloudfunctions.net/cancelOrder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            orderId: order.orderId,
          }),
        }
      );

      await response.json();
      setCancelSnackbarVisible(true);
    } catch (error) {
      setSnackbarData({
        message: "Failed to cancel order",
      });
    }
  };

  return (
    <>
      <View>
        <FlatList
          data={orders}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <OrderCard
              isFirst={index == 0}
              onRemoveItems={onRemoveItems}
              onReorder={onReorder}
              onCancelOrder={onCancelOrder}
              key={index}
              order={item}
            />
          )}
        />
      </View>
      <Portal>
        <Snackbar
          style={{
            backgroundColor: "red",
          }}
          visible={cancelSnackbarVisible}
          onDismiss={() => setCancelSnackbarVisible(false)}
          onIconPress={() => setCancelSnackbarVisible(false)}
        >
          <Text
            style={{
              color: "#FFF",
            }}
          >
            Your order has been cancelled!
          </Text>
        </Snackbar>
      </Portal>
    </>
  );
}
