import { View, Text } from "react-native";
import React, { useEffect, useMemo } from "react";
import { useNavigation } from "expo-router";
import OrderList from "../../components/Orders/OrderList";
import { useQuery } from "react-query";
import { useUser } from "@clerk/clerk-expo";
import fetchUserOrders from "@/queries/fetchUserOrders";
import OrderLoading from "../../components/Orders/OrderLoading";
import { Colors } from "../../constants/Colors";

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

  const orderContent = useMemo(() => {
    if (isFetching) return <OrderLoading />;
    else if (orders?.length) return <OrderList orders={orders} />;
    else
      return (
        <Text
          style={{
            marginTop: 20,
            fontSize: 16,
            color: Colors.darkGray,
            textAlign: "center",
          }}
        >
          You haven't placed any orders yet.
        </Text>
      );
  }, [isFetching, orders, orders?.length]);

  return (
    <View
      style={{
        paddingHorizontal: 10,
      }}
    >
      {orderContent}
    </View>
  );
}
