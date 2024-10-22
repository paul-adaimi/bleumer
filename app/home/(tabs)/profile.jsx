import React, { useCallback } from "react";
import { useNavigation, useFocusEffect } from "expo-router";
import ProfileScreen from "@/screens/Home/Tabs/ProfileScreen";

export default function profile() {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      navigation.getParent().setOptions({
        title: "Profile",
      });
    }, [navigation])
  );

  return <ProfileScreen />;
}
