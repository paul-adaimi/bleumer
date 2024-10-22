import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import { useCart } from "@/components/CartProvider";
import CartScreen from "@/components/Screens/Home/CartScreen";

export default function Cart() {
  const { cart } = useCart();

  const navigation = useNavigation();

  useEffect(() => {
    const cartItems = Object.values(cart);

    if (!cartItems.length) {
      navigation.goBack();
    }
  }, [cart]);

  return <CartScreen />;
}
