import { TouchableOpacity, Text, View } from "react-native";
import React, { useMemo, useState } from "react";
import { Image } from "react-native-expo-image-cache";
import MiddleModalScreen from "@/components/Modals/MiddleModalScreen";
import ProductModal from "@/components/Modals/Product";
import { useCart } from "@/components/CartProvider";
import { Colors } from "@/constants/Colors";

export default function SliderCard({ slider, isFirst }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { cart } = useCart();

  // Check the quantity of the product in the cart (array of objects)
  const quantity = useMemo(() => {
    const cartItems = Object.values(cart);

    const cartItem = cartItems.find((item) => item.id === slider.id);
    return cartItem ? cartItem.count : 0;
  }, [cart, slider]);

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
        <View
          style={{
            position: "absolute",
            paddingVertical: 5,
            paddingHorizontal: 15,
            backgroundColor: Colors.primary,
            borderRadius: 15,
            top: 10,
            right: 30,
            opacity: 0.7,
          }}
        >
          <Text style={{ fontWeight: "bold", color: Colors.white }}>
            {quantity}
          </Text>
        </View>
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
