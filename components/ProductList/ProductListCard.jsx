import { View, Text, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import NumericInput from "./NumericInput";
import { useCart } from "../CartProvider";
import { increment } from "firebase/firestore";

export default function ProductListCard({ product }) {
  const { cart, addToCart, updateItemCount } = useCart();

  const handleIncrement = () => {
    const newCount = (cart[product.id]?.count || 0) + 1;
    if (cart[product.id]) {
      updateItemCount(product.id, newCount);
    } else {
      addToCart(product.id, { ...product, count: 1 });
    }
  };

  const handleDecrement = () => {
    const newCount = (cart[product.id]?.count || 0) - 1;
    if (newCount > 0) {
      updateItemCount(product.id, newCount);
    } else {
      updateItemCount(product.id, 0); // This will remove the item if newCount is 0
    }
  };

  const productCount = cart[product.id]?.count || 0;
  const totalPrice = productCount * product.price;

  return (
    <View
      style={{
        padding: 10,
        margin: 10,
        borderRadius: 15,
        backgroundColor: "#FFF",
        display: "flex",
        flexDirection: "row",
        gap: 10,
      }}
    >
      <Image
        style={{
          width: 120,
          height: 120,
          borderRadius: 15,
        }}
        source={{ uri: product.imageUrl }}
      />

      <View style={{ flex: 1, gap: 7 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          {product.name}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: Colors.gray,
          }}
        >
          {product.about}
        </Text>
        <Text
          style={{
            color: Colors.gray,
          }}
        >
          {product.price}$ / Kilo
        </Text>
        <View
          style={{
            marginTop: 5,
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <NumericInput
            value={productCount}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
          <Text
            style={{
              paddingRight: 15,
            }}
          >
            Total: {totalPrice}$
          </Text>
        </View>
      </View>
    </View>
  );
}
