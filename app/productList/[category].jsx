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
    const q = query(collection(db, "Products"));
    const querySnapshot = await getDocs(q);

    const products = [];

    querySnapshot.forEach((doc) => {
      const productUuid = doc.id;
      const productData = doc.data();

      products.push({
        id: productUuid,
        ...productData,
      });
    });

    setProductList(products);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: category,
    });
    getProductListByCategory();
  }, []);

  return (
    <View>
      <FlatList
        data={productList}
        renderItem={({ item }) => (
          <ProductListCard product={item} key={item.id} />
        )}
      />
    </View>
  );
}
