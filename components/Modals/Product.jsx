import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native-expo-image-cache";
import { Colors } from "@/constants/Colors";
import NumericInput from "../NumericInput";
import { useCart } from "../CartProvider";

export default function Product({ product }) {
  const { cart, updateItemCount, addToCart } = useCart();

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

  return (
    <View>
      <Image
        uri={product.imageUrl}
        style={{
          width: 300,
          height: 150,
          borderRadius: 15,
        }}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: "600",
          marginTop: 10,
          color: Colors.primary,
        }}
      >
        {product.name}
      </Text>
      <Text
        style={{
          marginTop: 10,
          fontSize: 15,
          color: Colors.gray,
        }}
      >
        {product.about.replace(/\\n/g, "\n")}
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: Colors.gray,
          }}
        >
          ${product.price}
        </Text>
        <NumericInput
          value={productCount}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
      </View>
    </View>
  );
}
