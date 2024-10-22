import React, { useCallback } from "react";
import { useFocusEffect, useNavigation } from "expo-router";
import HomeScreen from "@/screens/Home/Tabs/HomeScreen";

// TODO: Check to fix this even further?
export default function home() {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      navigation.getParent().setOptions({
        title: "Home",
      });
    }, [navigation])
  );

  return <HomeScreen />;
}
