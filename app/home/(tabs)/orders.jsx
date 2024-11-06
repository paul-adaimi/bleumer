import React, { useCallback } from "react";
import { useNavigation, useFocusEffect } from "expo-router";
import OrdersScreen from "@/screens/Home/Tabs/OrdersScreen";

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
