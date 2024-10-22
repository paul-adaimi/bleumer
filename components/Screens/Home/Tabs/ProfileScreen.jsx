import { View } from "react-native";
import React from "react";
import UserIntro from "@/components/Profile/UserIntro";
import MenuList from "@/components/Profile/MenuList";

export default function ProfileScreen() {
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <UserIntro />
      <MenuList />
    </View>
  );
}
