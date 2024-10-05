import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import ProductCard from "../../components/Home/ProductCard";
import { useRouter } from "expo-router";
import { CopilotStep, walkthroughable } from "react-native-copilot";

const CopilotText = walkthroughable(Text);

export default function ProductList({ listName, productList, isWalkthrough }) {
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
        <CopilotStep
          text="Click here to view all products"
          order={5}
          name="ViewAll"
          active={!!isWalkthrough}
        >
          <CopilotText
            style={{
              color: Colors.primary,
            }}
            onPress={() => router.push("/productList/" + listName)}
          >
            View All
          </CopilotText>
        </CopilotStep>
      </View>
      <FlatList
        data={productList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ProductCard
            isWalkthrough={isWalkthrough}
            isFirst={index == 0}
            key={index}
            product={item}
          />
        )}
      />
    </View>
  );
}
