import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import OrderList from "../../components/Orders/OrderList";
import { useQuery } from "react-query";
import { useUser } from "@clerk/clerk-expo";
import fetchUserOrders from "@/queries/fetchUserOrders";

export default function orders() {
  const navigation = useNavigation();

  const { user } = useUser();

  const {
    data: orders,
    error,
    isFetching,
  } = useQuery("orders", async () => fetchUserOrders(user.id));

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Orders",
    });
  }, []);

  return (
    <View
      style={{
        padding: 10,
      }}
    >
      {orders?.length ? (
        <OrderList orders={orders} />
      ) : (
        <Text
          style={{
            textAlign: "center",
          }}
        >
          You haven't placed any orders yet
        </Text>
      )}
    </View>
  );
}
