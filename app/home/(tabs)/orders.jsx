import React, { useCallback } from "react";
import { useNavigation, useFocusEffect } from "expo-router";
import OrdersScreen from "@/screens/Home/Tabs/OrdersScreen";
import { useAuth } from "@/components/AuthProvider";
import UnauthenticatedScreen from "@/screens/Home/Tabs/UnauthenticatedScreen";

export default function orders() {
  const navigation = useNavigation();
  const { isSignedIn } = useAuth();

  useFocusEffect(
    useCallback(() => {
      navigation.getParent().setOptions({
        title: "Orders",
      });
    }, [navigation])
  );

  if (isSignedIn) {
    return <OrdersScreen />;
  }

  return <UnauthenticatedScreen page="orders" />;
}
