import React, { useCallback } from "react";
import { useNavigation, useFocusEffect } from "expo-router";
import ProfileScreen from "@/screens/Home/Tabs/ProfileScreen";
import UnauthenticatedScreen from "@/screens/Home/Tabs/UnauthenticatedScreen";
import { useAuth } from "@/components/AuthProvider";

export default function profile() {
  const navigation = useNavigation();
  const { isSignedIn } = useAuth();

  useFocusEffect(
    useCallback(() => {
      navigation.getParent().setOptions({
        title: "Profile",
      });
    }, [navigation])
  );

  if (isSignedIn) {
    <ProfileScreen />;
  }

  return <UnauthenticatedScreen page="profile" />;
}
