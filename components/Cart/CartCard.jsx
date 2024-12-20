import { View, Text } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import NumericInput from "@/components/NumericInput";
import { useCart } from "@/components/CartProvider";
import { Image } from "react-native-expo-image-cache";

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
          uri={cartItem.imageUrl}
          style={{
            width: 70,
            height: 70,
            borderRadius: 15,
          }}
        />
      </View>

      <View style={{ flex: 1, gap: 2 }}>
        <Text
          style={{
            fontSize: 16,
            color: Colors.primary,
          }}
        >
          {cartItem.name}
        </Text>
        <Text
          style={{
            color: Colors.gray,
          }}
        >
          Unit price: {cartItem.price}$
        </Text>
        <Text
          style={{
            color: Colors.gray,
          }}
        >
          {cartItem.weight}
        </Text>
        <Text>Total: {totalPrice}$</Text>
      </View>
      <View
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            alignSelf: "flex-end",
            borderRadius: 3,
            paddingHorizontal: 5,
            paddingVertical: 3,
            backgroundColor: Colors[cartItem.category],
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: Colors.white,
            }}
          >
            {cartItem.category.charAt(0).toUpperCase() +
              cartItem.category.slice(1)}
          </Text>
        </View>
        <NumericInput
          value={productCount}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
        />
      </View>
    </View>
  );
}
