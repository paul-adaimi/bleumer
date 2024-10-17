import { View, Text } from "react-native";
import React, { useCallback } from "react";
import UserIntro from "@/components/Profile/UserIntro";
import MenuList from "@/components/Profile/MenuList";
import { useNavigation, useFocusEffect } from "expo-router";

export default function profile() {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      navigation.getParent().setOptions({
        title: "Profile",
      });
    }, [navigation])
  );

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
