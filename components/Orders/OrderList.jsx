import { View, FlatList } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { useUser } from "@clerk/clerk-expo";
import fetchUserOrders from "@/queries/fetchUserOrders";
import OrderCard from "./OrderCard";
import { useCart } from "../CartProvider";

export default function OrderList() {
  // TODO: change order list bottom up
  const { user } = useUser();

  const { cart, addToCart, updateItemCount } = useCart();

  const {
    data: orders,
    error,
    isFetching,
  } = useQuery("orders", async () => fetchUserOrders(user.id));

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

  return (
    <View
      style={{
        padding: 10,
      }}
    >
      <FlatList
        data={orders}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item, index }) => (
          <OrderCard
            onRemoveItems={onRemoveItems}
            onReorder={onReorder}
            key={index}
            order={item}
          />
        )}
      />
    </View>
  );
}
