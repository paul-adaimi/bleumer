import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Linking } from "react-native";
import MenuItem from "./MenuItem";
import MiddleModalScreen from "@/components/Modals/MiddleModalScreen";
import { useAuth } from "@/components/AuthProvider";

export default function MenuList() {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const router = useRouter();
  const { signOut } = useAuth();

  const menuList = [
    {
      id: 1,
      name: "My Addresses",
      icon: "list",
      onPress: () => router.push("home/profileMenu/addresses"),
    },
    {
      id: 3,
      name: "Contact Us",
      icon: "call-outline",
      onPress: () => {
        const phoneNumber = "+96171235020";
        Linking.openURL(`tel:${phoneNumber}`);
      },
    },
    {
      id: 4,
      name: "Logout",
      icon: "log-out-outline",
      onPress: () => {
        setIsDialogVisible(true);
      },
    },
  ];

  return (
    <View style={{ marginTop: 20 }}>
      <FlatList
        showsVerticalScrollIndicator={false}
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

      <MiddleModalScreen
        visible={isDialogVisible}
        onClose={() => setIsDialogVisible(false)}
        title="Logout"
        button1Text="Cancel"
        button2Text="Logout"
        onButton1Press={() => setIsDialogVisible(false)}
        onButton2Press={() => {
          signOut();
          setIsDialogVisible(false);
        }}
      >
        <Text>Are you sure you want to log out?</Text>
      </MiddleModalScreen>
    </View>
  );
}
