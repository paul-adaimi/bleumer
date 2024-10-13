import { View, Text, FlatList } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Image } from "react-native-expo-image-cache";

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
          <View
            style={{
              // Shadow for iOS
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.4,
              shadowRadius: 3.84,
              // Shadow for Android
              elevation: 5,
            }}
          >
            <Image
              uri={item.imageUrl}
              style={{
                marginLeft: index == 0 ? 20 : 0,
                width: 300,
                height: 150,
                borderRadius: 15,
                marginRight: 20,
              }}
            />
          </View>
        )}
      />
    </View>
  );
}
