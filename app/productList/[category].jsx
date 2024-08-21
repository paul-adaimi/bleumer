import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import ProductListCard from "../../components/ProductList/ProductListCard";
import { collection, limit, query, getDocs } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";

export default function ProductListByCategory() {
  const [productList, setProductList] = useState([]);

  const navigation = useNavigation();
  const { category } = useLocalSearchParams();

  const getProductListByCategory = async () => {
    setProductList([]);
    const q = query(collection(db, "Products"), limit(10));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setProductList((prev) => [...prev, doc.data()]);
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
    });
    getProductListByCategory();
  }, []);

  console.log(productList);

  return (
    <View>
      <FlatList
        data={productList}
        renderItem={({ item, index }) => (
          <ProductListCard product={item} key={index} />
        )}
      />
    </View>
  );
}
