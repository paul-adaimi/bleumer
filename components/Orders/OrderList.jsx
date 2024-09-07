import { View, FlatList } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import { useUser } from "@clerk/clerk-expo";
import fetchUserOrders from "@/queries/fetchUserOrders";
import OrderCard from "./OrderCard";

export default function OrderList() {
  const { user } = useUser();

  const {
    data: orders,
    error,
    isFetching,
  } = useQuery("orders", async () => fetchUserOrders(user.id));

  return (
    <View
      style={{
        padding: 10,
      }}
    >
      <FlatList
        data={orders}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        renderItem={({ item, index }) => <OrderCard key={index} order={item} />}
      />
    </View>
  );
}
