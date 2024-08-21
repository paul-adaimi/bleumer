import { View, Text, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import NumericInput from "./NumericInput";

export default function ProductListCard({ product }) {
  console.log(product);
  return (
    <View
      style={{
        padding: 10,
        margin: 10,
        borderRadius: 15,
        backgroundColor: "#FFF",
        display: "flex",
        flexDirection: "row",
        gap: 10,
      }}
    >
      <Image
        style={{
          width: 120,
          height: 120,
          borderRadius: 15,
        }}
        source={{ uri: product.imageUrl }}
      />

      <View style={{ flex: 1, gap: 7 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          {product.name}
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: Colors.gray,
          }}
        >
          {product.about}
        </Text>
        <Text
          style={{
            color: Colors.gray,
          }}
        >
          {product.price}$ / Kilo
        </Text>
        <View
          style={{
            marginTop: 5,
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
          }}
        >
          <NumericInput />
          <Text
            style={{
              paddingRight: 15,
            }}
          >
            Total: 15$
          </Text>
        </View>
      </View>
    </View>
  );
}
