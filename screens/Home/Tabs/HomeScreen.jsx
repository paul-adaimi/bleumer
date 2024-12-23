import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import Header from "@/components/Home/Header";
import Slider from "@/components/Home/Slider";
import ProductList from "@/components/Home/ProductList";
import fetchProducts from "@/queries/fetchProducts";
import { useQuery } from "react-query";
import ProductListCard from "@/components/ProductList/ProductListCard";
import ProductsLoading from "@/components/Home/ProductsLoading";
import SliderLoading from "@/components/Home/SliderLoading";

export default function HomeScreen() {
  const [searchText, setSearchText] = useState("");

  const { data: productList, isFetching: isFetchingProducts } = useQuery(
    "products",
    async () => fetchProducts(),
    {
      staleTime: 1000 * 60 * 60 * 24,
      cacheTime: 1000 * 60 * 60 * 24,
    }
  );

  const frozenProducts = useMemo(() => {
    return productList
      ?.filter((product) => product.category === "frozen")
      .slice(0, 4);
  }, [productList]);

  const freshProducts = useMemo(() => {
    return productList
      ?.filter((product) => product.category === "fresh")
      .slice(0, 4);
  }, [productList]);

  const bundles = useMemo(() => {
    return productList?.filter((product) => product.category === "bundle");
  }, [productList]);

  // Filter productList based on searchText
  const filteredProducts = productList?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase()) &&
      product.category !== "bundle"
  );

  const homeContent = useMemo(() => {
    if (searchText && filteredProducts.length)
      return (
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => (
            <ProductListCard product={item} key={item.id} />
          )}
        />
      );
    else if (searchText && !filteredProducts.length)
      return (
        <Text
          style={{
            padding: 10,
            fontSize: 16,
            alignSelf: "center",
          }}
        >
          No items found!
        </Text>
      );
    else
      return (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            paddingTop: 20,
          }}
        >
          {isFetchingProducts ? (
            <SliderLoading />
          ) : (
            <Slider sliderList={bundles} />
          )}
          {isFetchingProducts ? (
            <View style={{ marginLeft: 20 }}>
              <ProductsLoading />
              <ProductsLoading />
              <View style={{ height: 40 }}></View>
            </View>
          ) : (
            <>
              <ProductList
                index={0}
                productList={freshProducts}
                listName="Fresh"
              />
              <ProductList
                index={1}
                productList={frozenProducts}
                listName="Frozen"
              />
              <View style={{ height: 40 }}></View>
            </>
          )}
        </ScrollView>
      );
  }, [
    isFetchingProducts,
    filteredProducts,
    productList,
    searchText,
    bundles,
    freshProducts,
    frozenProducts,
  ]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Header
        id="home"
        isLoading={isFetchingProducts}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      {homeContent}
    </View>
  );
}
