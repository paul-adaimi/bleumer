import React, { useCallback } from "react";
import { useNavigation, useFocusEffect } from "expo-router";
import OrdersScreen from "@/screens/Home/Tabs/OrdersScreen";

// TODO: Check to fix this even further? (Add Loading Screen and Empty State)
export default function orders() {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      navigation.getParent().setOptions({
        title: "Orders",
      });
    }, [navigation])
  );

  return <OrdersScreen />;
}
