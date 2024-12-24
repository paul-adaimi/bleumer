import React from "react";
import { Stack } from "expo-router";
import { UserProvider } from "@/components/UserProvider";
import { CartProvider } from "@/components/CartProvider";
import { AddressProvider } from "@/components/AddressProvider";

export default function HomeLayout() {
  return (
    <UserProvider>
      <AddressProvider>
        <CartProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="cart"
              options={{
                headerTitle: "My Cart",
              }}
            />
            <Stack.Screen name="checkout" options={{ title: "Checkout" }} />
            <Stack.Screen
              name="profileMenu/addAddress"
              options={{ title: "Add Address" }}
            />
            <Stack.Screen
              name="profileMenu/addresses"
              options={{ title: "All Addresses" }}
            />
            <Stack.Screen
              name="profileMenu/editAddress"
              options={{ title: "Edit Address" }}
            />
            <Stack.Screen
              name="productList/[category]"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="login" options={{ title: "Sign Up" }} />
            <Stack.Screen
              name="confirmation"
              options={{ title: "Confirmation" }}
            />
          </Stack>
        </CartProvider>
      </AddressProvider>
    </UserProvider>
  );
}
