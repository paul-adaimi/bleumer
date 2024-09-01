import { View, Text, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import NumericInput from "../NumericInput";
import { useCart } from "../CartProvider";

export default function CartCard({ cartItem }) {
  const { cart, updateItemCount } = useCart();

  const handleIncrement = () => {
    const newCount = cart[cartItem.id].count + 1;
    updateItemCount(cartItem.id, newCount);
  };

  const handleDecrement = () => {
    const newCount = (cart[cartItem.id]?.count || 0) - 1;
    if (newCount > 0) {
      updateItemCount(cartItem.id, newCount);
    } else {
      updateItemCount(cartItem.id, 0); // This will remove the item if newCount is 0
    }
  };

  const productCount = cart[cartItem.id]?.count || 0;
  const totalPrice = productCount * cartItem.price;

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
          style={{
            width: 70,
            height: 70,
            borderRadius: 15,
          }}
          source={{ uri: cartItem.imageUrl }}
        />
      </View>

      <View style={{ flex: 1, gap: 2 }}>
        <Text
          style={{
            fontSize: 16,
          }}
        >
          {cartItem.name}
        </Text>
        <Text
          style={{
            color: Colors.gray,
          }}
        >
          {cartItem.price}$ / Kilo
        </Text>
        <Text
          style={{
            marginTop: 10,
          }}
        >
          Total: {totalPrice}$
        </Text>
        <View
          style={{
            marginTop: 5,
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        ></View>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <NumericInput
          value={productCount}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
      </View>
    </View>
  );
}
