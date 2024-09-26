import { View, FlatList } from "react-native";
import React from "react";
import OrderCard from "./OrderCard";
import { useCart } from "../CartProvider";

export default function OrderList({ orders }) {
  const { cart, addToCart, updateItemCount } = useCart();

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
    <View>
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
