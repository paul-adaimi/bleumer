import { View, Text, FlatList, Image } from "react-native";
import React from "react";

export default function Slider({ sliderList }) {
  return (
    <View>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          marginBottom: 5,
          marginLeft: 20,
        }}
      >
        # Special for You
      </Text>
      <FlatList
        data={sliderList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Image
            source={{ uri: item.imageUrl }}
            style={{
              marginLeft: index == 0 ? 20 : 0,
              width: 300,
              height: 150,
              borderRadius: 15,
              marginRight: 20,
            }}
          />
        )}
      />
    </View>
  );
}
