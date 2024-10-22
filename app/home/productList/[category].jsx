import React, { useLayoutEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import CategoryScreen from "@/screens/Home/ProductList/CategoryScreen";

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

  return <CategoryScreen category={category} />;
}
