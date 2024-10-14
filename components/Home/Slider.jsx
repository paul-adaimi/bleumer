import { View, Text, FlatList } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import SliderCard from "./SliderCard";

export default function Slider({ sliderList }) {
  return (
    <View>
      <Text
        style={{
          fontWeight: "600",
          fontSize: 20,
          marginBottom: 5,
          marginLeft: 20,
          color: Colors.primary,
        }}
      >
        Bundles
      </Text>
      <FlatList
        style={{ overflow: "visible" }}
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <SliderCard slider={item} isFirst={index == 0} />
        )}
      />
    </View>
  );
}
