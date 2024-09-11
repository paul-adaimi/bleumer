import { View, FlatList, Text, TouchableOpacity } from "react-native";
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

  useEffect(() => {
    if (!cartItems.length) {
      navigation.goBack();
    }
  }, [cart]);

  const handleCheckout = () => {
    navigation.navigate("checkout");
  };

  return (
    <View
      style={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
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
      <View
        style={{
          padding: 15,
        }}
      >
        <TouchableOpacity
          onPress={handleCheckout}
          style={{
            backgroundColor: Colors.primary,
            padding: 16,
            borderRadius: 5,
            marginBottom: 15,
          }}
        >
          <Text style={{ textAlign: "center", color: "#FFF" }}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
