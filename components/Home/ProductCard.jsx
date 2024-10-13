import { View, Text } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useCart } from "../CartProvider";
import NumericInput from "../NumericInput";
import { Tip } from "react-native-tip";
import { useTour } from "../TourProvider";
import { Image } from "react-native-expo-image-cache";

export default function ProductCard({ product, index, listIndex }) {
  const { cart, addToCart, updateItemCount } = useCart();
  const { isInTour } = useTour();

  const isFirst = index == 0;

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
        marginLeft: isFirst ? 20 : 0,
        marginRight: 20,
        padding: 10,
        backgroundColor: "#FFF",
        borderRadius: 15,
        width: 220,
        height: 227,
      }}
    >
      <Image
        uri={product?.imageUrl}
        style={{
          width: 200,
          height: 130,
          borderRadius: 15,
        }}
      />
      <View style={{ marginTop: 7 }}>
        <Text
          style={{
            fontWeight: "600",
            fontSize: 16,
            color: Colors.primary,
          }}
          numberOfLines={1}
          ellipsizeMode="tail"
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
              fontSize: 13,
              color: Colors.gray,
            }}
          >
            ${product.price} / {product.weight}
          </Text>
          <Tip
            id={`numeric-input-${listIndex}-${index}`}
            title="Add or Remove Items"
            body="Use the +/- buttons to adjust the quantity of items in your cart."
            showItemPulseAnimation
            pulseColor={Colors.primary}
            dismissable={false}
            onPressItem={() => {}}
            active={false}
          >
            <View>
              <NumericInput
                value={productCount}
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                disabled={isInTour}
              />
            </View>
          </Tip>
        </View>
      </View>
    </View>
  );
}
