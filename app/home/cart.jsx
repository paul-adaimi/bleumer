import { View, FlatList, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import { useCart } from "@/components/CartProvider";
import CartCard from "@/components/Cart/CartCard";
import { Colors } from "@/constants/Colors";
import LoadingButton from "@/components/LoadingButton";

export default function Cart() {
  const { cart, subTotal } = useCart();

  const navigation = useNavigation();

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
          style={{ maxHeight: "80%" }}
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
      <View style={{ padding: 15, position: "relative", bottom: 15 }}>
        <LoadingButton onPress={handleCheckout} text="Checkout" />
      </View>
    </View>
  );
}
