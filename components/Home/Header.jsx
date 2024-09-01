import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useMemo } from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../CartProvider";
import { useNavigation } from "expo-router";

export default function Header() {
  const { totalItemCount } = useCart();
  const navigation = useNavigation();

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
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
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
            Paul's House
          </Text>
        </View>
        <TouchableOpacity
          style={{
            marginRight: 10,
            display: "flex",
            justifyContent: "center",
          }}
          onPress={() => navigation.navigate("cart")}
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
          <Ionicons
            style={{
              padding: 5,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: Colors.white,
            }}
            name="cart-outline"
            size={24}
            color={Colors.white}
          />
        </TouchableOpacity>
      </View>
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
          style={{
            fontSize: 16,
          }}
          placeholder="Search..."
        />
      </View>
    </View>
  );
}
