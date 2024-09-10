import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import ProductCard from "../../components/Home/ProductCard";
import { useRouter } from "expo-router";
import fetchProducts from "@/queries/fetchProducts";
import { useQuery } from "react-query";

export default function ProductList({ listName }) {
  const router = useRouter();

  const {
    data: productList,
    error,
    isFetching,
  } = useQuery("products", async () => fetchProducts());

  return (
    <View>
      <View
        style={{
          padding: 20,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{listName}</Text>
        <Text
          style={{
            color: Colors.primary,
          }}
          onPress={() => router.push("/productList/" + listName)}
        >
          View All
        </Text>
      </View>
      <FlatList
        data={productList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ProductCard key={index} product={item} />
        )}
      />
    </View>
  );
}
