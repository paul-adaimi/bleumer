import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import ProductListCard from "../../components/ProductList/ProductListCard";
import { useQuery } from "react-query";
import fetchProducts from "@/queries/fetchProducts";
import Header from "@/components/Home/Header";

export default function ProductListByCategory() {
  const navigation = useNavigation();
  const { category } = useLocalSearchParams();

  const {
    data: productList,
    error,
    isFetching,
  } = useQuery("products", async () => fetchProducts());

  return (
    <View>
      <Header title={category} />
      <FlatList
        data={productList}
        renderItem={({ item }) => (
          <ProductListCard product={item} key={item.id} />
        )}
      />
    </View>
  );
}
