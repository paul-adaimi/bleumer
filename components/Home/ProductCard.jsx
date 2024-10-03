import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../CartProvider";
import NumericInput from "../NumericInput";

export default function ProductCard({ product }) {
  const { cart, addToCart, updateItemCount } = useCart();

  const productCount = cart[product.id]?.count || 0;

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
      updateItemCount(product.id, 0);
    }
  };

  return (
    <View
      style={{
        marginRight: 20,
        padding: 10,
        backgroundColor: "#FFF",
        borderRadius: 15,
      }}
    >
      <Ionicons
        style={{
          position: "absolute",
          top: 15,
          right: 15,
          zIndex: 100,
          opacity: 0.7,
        }}
        name="heart-outline"
        size={35}
        color={Colors.white}
      />
      <Image
        source={{ uri: product?.imageUrl }}
        style={{
          width: 200,
          height: 130,
          borderRadius: 15,
        }}
      />
      <View style={{ marginTop: 7 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 17,
          }}
        >
          {product.name}
        </Text>
        <View
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 15,
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
    </View>
  );
}
