import { View, Text, FlatList } from "react-native";
import React, { useLayoutEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import ProductListCard from "@/components/ProductList/ProductListCard";
import { useQuery } from "react-query";
import fetchProducts from "@/queries/fetchProducts";
import Header from "@/components/Home/Header";

export default function ProductListByCategory() {
  const { category } = useLocalSearchParams();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    if (category) {
      navigation.setOptions({
        title: category,
      });
    }
  }, [navigation, category]);

  const {
    data: productList,
    error,
    isFetching,
  } = useQuery("products", async () => fetchProducts());

  const list = productList?.filter(
    (product) => product.category === category.toLowerCase()
  );

  return (
    <View style={{ height: "100%" }}>
      <Header title={category} />
      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductListCard product={item} />}
      />
    </View>
  );
}
