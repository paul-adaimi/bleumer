import { View, FlatList, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { useCart } from "../components/CartProvider";
import CartCard from "../components/Cart/CartCard";
import { Colors } from "@/constants/Colors";

export default function Cart() {
  const { cart, subTotal } = useCart();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "My Cart",
    });
  }, []);

  const cartItems = Object.values(cart);

  return (
    <View>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => <CartCard cartItem={item} key={item.id} />}
      />
      <View
        style={{
          borderWidth: 1,
          borderColor: Colors.gray,
          borderStyle: "dashed",
          marginTop: 10,
          marginHorizontal: 10,
        }}
      />

      <View
        style={{
          padding: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          Subtotal
        </Text>
        <Text
          style={{
            fontSize: 16,
          }}
        >
          {subTotal}$
        </Text>
      </View>
    </View>
  );
}
