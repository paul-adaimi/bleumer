import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import OrderList from "../../components/Orders/OrderList";

export default function orders() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Orders",
    });
  }, []);

  return (
    <View>
      <OrderList />
    </View>
  );
}
