import React, { useEffect } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";
import AuthProvider from "@/components/AuthProvider";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/home"} />;
  }

  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: "Welcome" }}
        />
        <Stack.Screen name="link" options={{ title: "Sign Up" }} />
        <Stack.Screen name="login" options={{ title: "Sign Up" }} />
        <Stack.Screen name="confirmation" options={{ title: "Confirmation" }} />
      </Stack>
    </AuthProvider>
  );
}
