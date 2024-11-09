import { View, FlatList } from "react-native";
import React from "react";
import ProductListCard from "@/components/ProductList/ProductListCard";
import { useQuery } from "react-query";
import fetchProducts from "@/queries/fetchProducts";
import Header from "@/components/Home/Header";

export default function CategoryScreen({ category }) {
  const {
    data: productList,
    error,
    isFetching,
  } = useQuery("products", async () => fetchProducts(), {
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
  });

  const list = productList?.filter(
    (product) => product.category === category.toLowerCase()
  );

  return (
    <View style={{ height: "100%" }}>
      <Header id="category" title={category} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={list}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductListCard product={item} />}
      />
    </View>
  );
}
