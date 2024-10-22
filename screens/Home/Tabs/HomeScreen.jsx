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
import { showTipTour } from "react-native-tip";
import { useTour } from "@/components/TourProvider";

export default function HomeScreen() {
  const [searchText, setSearchText] = useState("");

  const { isInTour } = useTour();

  const { data: productList, isFetching: isFetchingProducts } = useQuery(
    "products",
    async () => fetchProducts()
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

  const tour = useMemo(
    () => [
      {
        id: "address",
        nextId: "search",
      },
      {
        id: "search",
        nextId: "numeric-input-0-0",
      },
      {
        id: "numeric-input-0-0",
        nextId: "view-all-0",
      },
      {
        id: "view-all-0",
        nextId: "cart",
      },
      {
        id: "cart",
      },
    ],
    []
  );

  useEffect(() => {
    if (productList && isInTour) {
      showTipTour(tour);
    }
  }, [productList, isInTour]);

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
        isLoading={isFetchingProducts}
        searchText={searchText}
        setSearchText={setSearchText}
      />

      {homeContent}
    </View>
  );
}
