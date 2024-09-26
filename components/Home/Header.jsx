import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useMemo, useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../CartProvider";
import { useNavigation } from "expo-router";
import { useAddress } from "../AddressProvider";
import ModalScreen from "../ModalScreen";
import AddressesModal from "../Modals/Addresses";

export default function Header({ searchText, setSearchText, title }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { totalItemCount } = useCart();
  const navigation = useNavigation();
  const { currentAddress } = useAddress();

  const totalCountFinal = useMemo(
    () => (totalItemCount > 99 ? "99+" : totalItemCount),
    [totalItemCount]
  );

  const countBadgeRight = useMemo(() => {
    if (totalItemCount < 9) return -10;
    else if (totalItemCount < 100) return -15;
    else return -25;
  }, [totalItemCount]);

  return (
    <View
      style={{
        padding: 20,
        paddingTop: 40,
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
      <ModalScreen
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Choose an Address"
      >
        <AddressesModal onClose={() => setIsModalVisible(false)} />
      </ModalScreen>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Ionicons
            style={{
              borderColor: Colors.white,
            }}
            name="location-sharp"
            size={24}
            color={Colors.white}
          />
          <Text
            style={{
              color: "#FFF",
              fontSize: 17,
            }}
          >
            {currentAddress?.name}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginRight: 10,
            display: "flex",
            justifyContent: "center",
            backgroundColor: totalItemCount
              ? Colors.primary
              : Colors.primaryShade,
            paddingHorizontal: 5,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: Colors.white,
          }}
          onPress={() => navigation.navigate("cart")}
          disabled={!totalItemCount}
        >
          <View
            style={{
              backgroundColor: Colors.gray,
              position: "absolute",
              paddingHorizontal: 4,
              paddingVertical: 2,
              right: countBadgeRight,
              borderRadius: 10,
              zIndex: 100,
            }}
          >
            <Text style={{ color: Colors.white }}>{totalCountFinal}</Text>
          </View>
          <Ionicons name="cart-outline" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>
      {setSearchText && (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            backgroundColor: "#FFF",
            padding: 10,
            marginVertical: 10,
            marginTop: 15,
            borderRadius: 8,
          }}
        >
          <Ionicons name="search" size={24} color={Colors.primary} />
          <TextInput
            value={searchText || ""}
            onChangeText={(value) => setSearchText(value)}
            style={{
              fontSize: 16,
            }}
            placeholder="Search..."
          />
        </View>
      )}
      {title && (
        <View
          style={{
            marginTop: 15,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color={Colors.white} />
            <Text
              style={{ fontSize: 16, fontWeight: "600", color: Colors.white }}
            >
              Home
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 16,
              color: Colors.white,
              position: "absolute", // Absolutely position the text
              left: "50%", // Move to 50% of the width
              transform: [{ translateX: -45 }], // Center it based on screen width
            }}
          >
            {title}
          </Text>
        </View>
      )}
    </View>
  );
}
