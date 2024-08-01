import { View, Text, ScrollView } from "react-native";
import React from "react";
import Header from "../../components/Home/Header";
import Slider from "../../components/Home/Slider";
import ProductList from "../../components/Home/ProductList";

export default function home() {
  return (
    <ScrollView>
      <Header />
      <Slider />
      <ProductList />
      <ProductList />
    </ScrollView>
  );
}
