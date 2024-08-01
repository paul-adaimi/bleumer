import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { collection, limit, query, getDocs } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import ProductCard from "../../components/Home/ProductCard";

export default function ProductList() {
  const [productList, setProductList] = useState([]);

  const GetProductList = async () => {
    setProductList([]);
    const q = query(collection(db, "Products"), limit(10));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setProductList((prev) => [...prev, doc.data()]);
    });
  };

  useEffect(() => {
    GetProductList();
  }, []);
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
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Products</Text>
        <Text
          style={{
            color: Colors.primary,
          }}
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
