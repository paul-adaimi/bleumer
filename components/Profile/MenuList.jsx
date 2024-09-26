import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Linking } from "react-native";

export default function MenuList() {
  const { signOut } = useAuth();
  const router = useRouter();

  const menuList = [
    {
      id: 1,
      name: "My Addresses",
      icon: "list",
      onPress: () => router.push("/profileMenu/addresses"),
    },
    {
      id: 2,
      name: "My Favorites",
      icon: "star-outline",
      onPress: () => {},
    },
    {
      id: 3,
      name: "Call",
      icon: "call-outline",
      onPress: () => {
        const phoneNumber = "+96171740227";
        Linking.openURL(`tel:${phoneNumber}`);
      },
    },
    {
      id: 4,
      name: "Logout",
      icon: "log-out-outline",
      onPress: () => signOut(),
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
            onPress={item.onPress}
          >
            <View
              style={{
                borderRadius: 5,
                padding: 5,
                backgroundColor: Colors.primary,
              }}
            >
              <Ionicons
                name={item.icon}
                size={40}
                color={Colors.white}
              ></Ionicons>
            </View>
            {/* <Image
              source={item.icon}
              style={{
                width: 50,
                height: 50,
              }}
            /> */}
            <Text style={{ fontSize: 15, fontWeight: "700", flex: 1 }}>
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
        Developed by Paul Adaimi @ 2024
      </Text>
    </View>
  );
}
