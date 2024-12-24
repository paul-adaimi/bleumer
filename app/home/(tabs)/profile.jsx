import React, { useCallback } from "react";
import { useNavigation, useFocusEffect, Redirect } from "expo-router";
import ProfileScreen from "@/screens/Home/Tabs/ProfileScreen";
import UnauthenticatedScreen from "@/screens/Home/Tabs/UnauthenticatedScreen";
import { useAuth } from "@/components/AuthProvider";

export default function profile() {
  const navigation = useNavigation();
  const { isSignedIn, currentUser } = useAuth();

  useFocusEffect(
    useCallback(() => {
      navigation.getParent().setOptions({
        title: "Profile",
      });
    }, [navigation])
  );

  if (isSignedIn && currentUser?.displayName) {
    return <ProfileScreen />;
  } else if (isSignedIn) {
    return <Redirect href={"/home/enterName"} />;
  } else {
    return <UnauthenticatedScreen page="profile" />;
  }
}
