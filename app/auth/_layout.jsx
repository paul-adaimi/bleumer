import React from "react";
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
      <Stack.Screen name="login" />
    </Stack>
  );
}
