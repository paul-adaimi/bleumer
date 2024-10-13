import { View, Text } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import NumericInput from "../NumericInput";
import { useCart } from "../CartProvider";
import { Image } from "react-native-expo-image-cache";

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
      <View
        style={{
          // Shadow for iOS
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 3.84,
          // Shadow for Android
          elevation: 5,
        }}
      >
        <Image
          uri={product.imageUrl}
          style={{
            width: 110,
            height: 110,
            borderRadius: 15,
          }}
        />
      </View>

      <View style={{ flex: 1, gap: 7 }}>
        <Text
          style={{
            fontWeight: "600",
            color: Colors.primary,
            fontSize: product.name.length > 27 ? 15 : 16,
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
          {product.price}$ / {product.weight}
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
              color: Colors.gray,
            }}
          >
            Total: {totalPrice}$
          </Text>
        </View>
      </View>
    </View>
  );
}
