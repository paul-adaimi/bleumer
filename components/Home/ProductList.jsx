import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import ProductCard from "../../components/Home/ProductCard";
import { useRouter } from "expo-router";
import { Tip } from "react-native-tip";
import { useTour } from "../TourProvider";

export default function ProductList({
  listName,
  productList,
  index: listIndex,
}) {
  const router = useRouter();

  const { isInTour } = useTour();

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
          body="Tap here to explore all available products."
          showItemPulseAnimation
          pulseColor={Colors.primary}
          dismissable={false}
          onPressItem={() => {}}
          active={false}
        >
          <TouchableOpacity
            onPress={() => router.push("/productList/" + listName)}
            disabled={isInTour}
          >
            <Text
              style={{
                color: Colors.primary,
              }}
            >
              View All
            </Text>
          </TouchableOpacity>
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
