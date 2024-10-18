import React from "react";
import { Stack, Redirect } from "expo-router";
import { UserProvider } from "@/components/UserProvider";
import { CartProvider } from "@/components/CartProvider";
import { AddressProvider } from "@/components/AddressProvider";
import { useAuth } from "@clerk/clerk-expo";

export default function HomeLayout() {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return <Redirect href={"/firebaseauth"} />;
  }

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
          </Stack>
        </CartProvider>
      </AddressProvider>
    </UserProvider>
  );
}
