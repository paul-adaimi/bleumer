import { View, Text, FlatList } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Linking } from "react-native";
import MenuItem from "./MenuItem";

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
        renderItem={({ item }) => (
          <MenuItem
            onPress={item.onPress}
            title={item.name}
            iconName={item.icon}
          />
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
