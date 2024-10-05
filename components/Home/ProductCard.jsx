import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../CartProvider";
import NumericInput from "../NumericInput";
import { Tip } from "react-native-tip";
import { useTour } from "../TourProvider";

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
          <Tip
            id={`numeric-input-${listIndex}-${index}`}
            title="Add or Remove Items"
            body="Use the +/- buttons to adjust the quantity of items in your cart."
            showItemPulseAnimation
            pulseColor={Colors.primary}
            dismissable={false}
            onPressItem={() => {}}
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
