import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/components/AuthProvider";

export default function AuthRoutesLayout() {
  const { isSignedIn, currentUser } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/home"} />;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false, title: "Welcome" }}
      />
      <Stack.Screen name="link" options={{ title: "Sign Up" }} />
      <Stack.Screen name="login" options={{ title: "Sign Up" }} />
      <Stack.Screen name="confirmation" options={{ title: "Confirmation" }} />
    </Stack>
  );
}
