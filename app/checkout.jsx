import { View, Text, TouchableOpacity, Animated } from "react-native";
import React, { useEffect, useCallback } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "@/constants/Colors";
import CheckoutCard from "../components/Cart/CheckoutCard";
import CustomTextInput from "../components/CustomTextInput";
import { useCart } from "../components/CartProvider";
import { useUser } from "@clerk/clerk-expo";
import { useQueryClient, useMutation } from "react-query";
import createOrder from "./queries/createOrder";

export default function Checkout() {
  const navigation = useNavigation();
  const { cart, subTotal } = useCart();
  const { user } = useUser();
  const queryClient = useQueryClient();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Checkout",
      headerBackTitle: "My Cart",
    });
  }, []);

  // TODO: Add animation instead
  const { isLoading, mutate } = useMutation(() => createOrder(user.id, cart), {
    onSuccess: () => {
      queryClient.invalidateQueries("orders");
    },
  });

  if (isLoading) return <Text>loading...</Text>;

  return (
    <View
      style={{
        padding: 5,
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <View>
        <CheckoutCard title="Delivery Address">
          <Text>Paul Adaimi</Text>
          <Text>Matn - Lebanon</Text>
          <Text>Biyada 12th street, 17th building, floor -1</Text>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              marginTop: 10,
              height: 25,
              borderRadius: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: Colors.white }}>Change</Text>
          </TouchableOpacity>
        </CheckoutCard>
        <CheckoutCard title="Delivery Day">
          <Text>Monday September 2, 2024</Text>
        </CheckoutCard>
        <CheckoutCard title="Payment Method">
          <Text> Only cash available at the moment</Text>
        </CheckoutCard>
        <CheckoutCard title="Promo Code">
          <CustomTextInput />
        </CheckoutCard>
        <CheckoutCard>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>Subtotal</Text>
            <Text>$ 123</Text>
          </View>
          <View
            style={{
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>Delivery Charge</Text>
            <Text>$ 123</Text>
          </View>
          <View
            style={{
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>Discount</Text>
            <Text>- $ 123</Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: Colors.gray,
              borderStyle: "dashed",
              marginTop: 10,
            }}
          />
          <View
            style={{
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Total</Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>$ 123</Text>
          </View>
        </CheckoutCard>
      </View>
      <View
        style={{
          padding: 15,
        }}
      >
        <TouchableOpacity
          onPress={mutate}
          style={{
            backgroundColor: Colors.primary,
            padding: 16,
            borderRadius: 5,
            marginBottom: 15,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: "#FFF",
              fontWeight: "bold",
            }}
          >
            Place Order
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
