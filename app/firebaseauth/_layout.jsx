import React, { useEffect } from "react";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect, Stack } from "expo-router";

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

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
