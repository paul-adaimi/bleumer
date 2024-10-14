import { TouchableOpacity, Text } from "react-native";
import React, { useState } from "react";
import { Image } from "react-native-expo-image-cache";
import MiddleModalScreen from "@/components/Modals/MiddleModalScreen";
import ProductModal from "@/components/Modals/Product";

export default function SliderCard({ slider, isFirst }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={{
          // Shadow for iOS
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.4,
          shadowRadius: 3.84,
          // Shadow for Android
          elevation: 5,
        }}
        onPress={() => setIsModalVisible(true)}
      >
        <Image
          uri={slider.imageUrl}
          style={{
            marginLeft: isFirst ? 20 : 0,
            width: 300,
            height: 150,
            borderRadius: 15,
            marginRight: 20,
          }}
        />
      </TouchableOpacity>
      <MiddleModalScreen
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title={"Bundle"}
      >
        <ProductModal product={slider} />
      </MiddleModalScreen>
    </>
  );
}
