import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import { useQuery } from "react-query";
import fetchSliders from "@/queries/fetchSliders";

export default function Slider() {
  const {
    data: sliderList,
    error,
    isFetching,
  } = useQuery("sliders", async () => fetchSliders());

  return (
    <View>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          paddingLeft: 20,
          paddingTop: 20,
          marginBottom: 5,
        }}
      >
        # Special for You
      </Text>
      <FlatList
        style={{
          paddingLeft: 20,
        }}
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Image
            source={{ uri: item.imageUrl }}
            style={{
              width: 300,
              height: 150,
              borderRadius: 15,
              marginRight: 15,
            }}
          />
        )}
      />
    </View>
  );
}
