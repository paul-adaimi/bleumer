import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import ProductCard from "@/components/Home/ProductCard";
import { useRouter } from "expo-router";

export default function ProductList({
  listName,
  productList,
  index: listIndex,
}) {
  const router = useRouter();

  return (
    <View>
      <View
        style={{
          padding: 20,
          paddingBottom: 5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginTop: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            color: Colors.primary,
          }}
        >
          {listName}
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/home/productList/" + listName)}
        >
          <Text
            style={{
              color: Colors.primary,
            }}
          >
            View All
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ overflow: "visible" }}
        data={productList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ProductCard
            listIndex={listIndex}
            index={index}
            key={index}
            product={item}
          />
        )}
      />
    </View>
  );
}
