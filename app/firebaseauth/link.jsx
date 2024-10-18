import React from "react";
import LoginScreen from "@/components/Screens/Auth/LoginScreen";
import { useRouter } from "expo-router";
import { useAuth } from "@/components/AuthProvider";

export default function link() {
  const { confirmation } = useAuth();
  const router = useRouter();

  if (confirmation) {
    router.push("/firebaseauth/confirmation");
  }

  return <LoginScreen />;
}
