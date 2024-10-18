import React from "react";
import { Text } from "react-native";
import { useRouter, useFocusEffect } from "expo-router";

export default function link() {
  const router = useRouter();

  useFocusEffect(() => {
    router.back();
  });

  return <Text>Linking...</Text>;
}
