import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import ProductList from "../../components/Home/ProductList";
import fetchProducts from "@/queries/fetchProducts";
import { useQuery } from "react-query";
import ProductListCard from "@/components/ProductList/ProductListCard";
import ProductsLoading from "@/components/Home/ProductsLoading";
import SliderLoading from "@/components/Home/SliderLoading";
import fetchSliders from "@/queries/fetchSliders";
import { useCopilot } from "react-native-copilot";
import { showTipTour } from "react-native-tip";

export default function home() {
  const [searchText, setSearchText] = useState("");

  const { start } = useCopilot();

  const { data: productList, isFetching: isFetchingProducts } = useQuery(
    "products",
    async () => fetchProducts()
  );

  const { data: sliderList, isFetching: isFetchingSlider } = useQuery(
    "sliders",
    async () => fetchSliders()
  );

  useEffect(() => {
    if (productList && sliderList) {
      // start();
      showTipTour([
        {
          id: "heart",
          nextId: "test",
        },
        {
          id: "test",
          prevId: "tab1",
          nextId: "heart",
          delay: 300,
          nextAction: () => navigation.navigate("AnotherScreen"),
          prevAction: () => navigation.navigate("HomeScreen"),
        },
        {
          id: "heart",
          prevId: "tab2",
          nextId: "top-left",
          delay: 300,
          nextAction: () => navigation.navigate("HomeScreen"),
        },
        {
          id: "top-left",
          prevId: "heart",
          delay: 300,
          prevAction: () => navigation.navigate("AnotherScreen"),
        },
      ]);
    }
  }, [productList, sliderList]);

  // Filter productList based on searchText
  const filteredProducts = productList?.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
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
        <View>
          {isFetchingSlider ? (
            <SliderLoading />
          ) : (
            <Slider sliderList={sliderList} />
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
                isWalkthrough={true}
                productList={productList}
                listName="Products 1"
              />
              <ProductList productList={productList} listName="Products 2" />
              <View style={{ height: 40 }}></View>
            </>
          )}
        </View>
      );
  }, [
    isFetchingProducts,
    isFetchingSlider,
    filteredProducts,
    productList,
    sliderList,
    searchText,
  ]);

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
          paddingTop: 20,
        }}
      >
        {homeContent}
      </ScrollView>
    </View>
  );
}
