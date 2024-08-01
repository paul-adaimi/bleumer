import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function ProductCard({ product }) {
  return (
    <View
      style={{
        marginLeft: 20,
        padding: 10,
        backgroundColor: "#FFF",
        borderRadius: 15,
      }}
    >
      <Ionicons
        style={{
          position: "absolute",
          top: 15,
          right: 15,
          zIndex: 100,
          opacity: 0.7,
        }}
        name="heart-outline"
        size={35}
        color={Colors.white}
      />
      <Image
        source={{ uri: product?.imageUrl }}
        style={{
          width: 200,
          height: 130,
          borderRadius: 15,
        }}
      />
      <View style={{ marginTop: 7 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 17,
          }}
        >
          {product.name}
        </Text>
        <View
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: Colors.gray,
            }}
          >
            ${product.price}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.primary,
              padding: 5,
              borderRadius: 5,
            }}
          >
            <Text style={{ textAlign: "center", color: "#FFF" }}>
              {" "}
              Add to Cart
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
