import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function MenuList() {
  const router = useRouter();

  const menuList = [
    {
      id: 1,
      name: "My Addresses",
      icon: require("./../../assets/images/addresses-icon.png"),
      path: "addAddress",
    },
    {
      id: 2,
      name: "My Favorites",
      icon: require("./../../assets/images/favorites-icon.png"),
      path: "",
    },
    {
      id: 3,
      name: "Share App",
      icon: require("./../../assets/images/share-icon.png"),
      path: "",
    },
    {
      id: 4,
      name: "Logout",
      icon: require("./../../assets/images/logout-icon.png"),
      path: "",
    },
  ];

  return (
    <View style={{ marginTop: 50 }}>
      <FlatList
        data={menuList}
        numColumns={2}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              flex: 1,
              padding: 10,
              borderRadius: 15,
              borderWidth: 1,
              margin: 10,
              backgroundColor: "#FFF",
              borderColor: Colors.primary,
            }}
            onPress={() => router.push("/profileMenu/" + item.path)}
          >
            <Image
              source={item.icon}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Text style={{ fontSize: 16, fontWeight: "700", flex: 1 }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Text
        style={{
          textAlign: "center",
          marginTop: 50,
          color: Colors.gray,
        }}
      >
        {" "}
        Developed by Paul Adaimi @ 2024
      </Text>
    </View>
  );
}
