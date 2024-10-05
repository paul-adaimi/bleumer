import React, { useEffect } from "react";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import LoginScreen from "../components/LoginScreen";
import * as SecureStore from "expo-secure-store";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { CartProvider } from "@/components/CartProvider";
import { AddressProvider } from "@/components/AddressProvider";
import { Provider as PaperProvider } from "react-native-paper";
import TipProvider from "react-native-tip";

const tokenCache = {
  async getToken(key) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

if (!publishableKey) {
  throw new Error(
    "Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env"
  );
}

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
        <PaperProvider>
          <SignedIn>
            <AddressProvider>
              <CartProvider>
                <Stack
                  screenOptions={{
                    headerBackTitle: "Home",
                    headerShown: false,
                  }}
                >
                  <Stack.Screen
                    name="(tabs)"
                    options={{ headerShown: false }}
                  />
                </Stack>
              </CartProvider>
            </AddressProvider>
          </SignedIn>
          <SignedOut>
            <LoginScreen />
          </SignedOut>
        </PaperProvider>
      </ClerkProvider>
      <TipProvider
        overlayOpacity={0.8}
        titleStyle={{
          fontWeight: "bold",
          fontSize: 18,
          marginBottom: 10,
        }}
        bodyStyle={{
          fontSize: 16,
        }}
        tipContainerStyle={{
          padding: 20,
          borderRadius: 20,
          maxWidth: 350,
          elevation: 5,
        }}
        prevNextTextStyle={{}}
        prevNextButtonStyle={{}}
      />
    </QueryClientProvider>
  );
}
