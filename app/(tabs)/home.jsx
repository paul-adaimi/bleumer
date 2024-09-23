import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useState } from "react";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import ProductList from "../../components/Home/ProductList";
import fetchProducts from "@/queries/fetchProducts";
import { useQuery } from "react-query";
import ProductListCard from "@/components/ProductList/ProductListCard";

export default function home() {
  const [searchText, setSearchText] = useState("");

  const {
    data: productList,
    error,
    isFetching,
  } = useQuery("products", async () => fetchProducts());

  // Filter productList based on searchText
  const filteredProducts = productList?.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Header searchText={searchText} setSearchText={setSearchText} />
      {searchText ? (
        filteredProducts.length ? (
          <FlatList
            data={filteredProducts}
            renderItem={({ item }) => (
              <ProductListCard product={item} key={item.id} />
            )}
          />
        ) : (
          <Text
            style={{
              padding: 10,
              fontSize: 16,
              alignSelf: "center",
            }}
          >
            {" "}
            No items found!{" "}
          </Text>
        )
      ) : (
        <ScrollView>
          <Slider />
          <ProductList listName="Products 1" />
          <ProductList listName="Products 2" />
        </ScrollView>
      )}
    </View>
  );
}
