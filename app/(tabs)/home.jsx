import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useState } from "react";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import ProductList from "../../components/Home/ProductList";
import fetchProducts from "@/queries/fetchProducts";
import { useQuery } from "react-query";
import ProductListCard from "@/components/ProductList/ProductListCard";
import ProductsLoading from "@/components/Home/ProductsLoading";
import SliderLoading from "@/components/Home/SliderLoading";
import fetchSliders from "@/queries/fetchSliders";

export default function home() {
  const [searchText, setSearchText] = useState("");

  const { data: productList, isFetching: isFetchingProducts } = useQuery(
    "products",
    async () => fetchProducts()
  );

  const { data: sliderList, isFetching: isFetchingSlider } = useQuery(
    "sliders",
    async () => fetchSliders()
  );

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
      <Header
        isLoading={isFetchingProducts}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <ScrollView
        style={{
          paddingLeft: 20,
          paddingTop: 20,
        }}
      >
        <HomeContent
          isLoadingProducts={isFetchingProducts}
          isLoadingSlider={isFetchingSlider}
          searchText={searchText}
          filteredProducts={filteredProducts}
          sliderList={sliderList}
          productList={productList}
        />
      </ScrollView>
    </View>
  );
}

function HomeContent({
  isLoadingProducts,
  isLoadingSlider,
  filteredProducts,
  productList,
  sliderList,
  searchText,
}) {
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
      <View>
        {isLoadingSlider ? (
          <SliderLoading />
        ) : (
          <Slider sliderList={sliderList} />
        )}
        {isLoadingProducts ? (
          <>
            <ProductsLoading />
            <ProductsLoading />
            <View style={{ height: 40 }}></View>
          </>
        ) : (
          <>
            <ProductList productList={productList} listName="Products 1" />
            <ProductList productList={productList} listName="Products 2" />
            <View style={{ height: 40 }}></View>
          </>
        )}
      </View>
    );
}
