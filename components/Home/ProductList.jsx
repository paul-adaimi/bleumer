import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import ProductCard from "../../components/Home/ProductCard";
import { useRouter } from "expo-router";
import { Tip } from "react-native-tip";

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
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>{listName}</Text>
        <Tip
          id={`view-all-${listIndex}`}
          title="View All"
          body="Click here to view all the products"
          showItemPulseAnimation
          pulseColor={Colors.primary}
          dismissable={false}
          onPressItem={() => {}}
        >
          <Text
            style={{
              color: Colors.primary,
            }}
            onPress={() => router.push("/productList/" + listName)}
          >
            View All
          </Text>
        </Tip>
      </View>
      <FlatList
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
