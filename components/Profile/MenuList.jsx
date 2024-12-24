import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Linking } from "react-native";
import MenuItem from "./MenuItem";
import MiddleModalScreen from "@/components/Modals/MiddleModalScreen";
import { useAuth } from "@/components/AuthProvider";
import deleteAccount from "@/queries/deleteAccount";
import { useSnackbar } from "@/components/SnackbarProvider";

export default function MenuList() {
  const [dialogDetails, setDialogDetails] = useState(null);
  const router = useRouter();
  const { signOut, currentUser } = useAuth();
  const { setSnackbarData } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);

  const menuList = [
    {
      id: 1,
      name: "My Addresses",
      icon: "list",
      color: Colors.primary,
      onPress: () => router.push("home/profileMenu/addresses"),
    },
    {
      id: 2,
      name: "Contact Us",
      icon: "call-outline",
      color: Colors.primary,
      onPress: () => {
        const phoneNumber = "+96171235020";
        Linking.openURL(`tel:${phoneNumber}`);
      },
    },
    {
      id: 3,
      name: "Logout",
      icon: "log-out-outline",
      color: Colors.primary,
      onPress: () => {
        setDialogDetails({
          title: "Logout",
          content: "Are you sure you want to log out?",
          button1Text: "Cancel",
          button2Text: "Logout",
          onButton1Press: () => setDialogDetails(null),
          onButton2Press: () => {
            signOut();
            setDialogDetails(null);
          },
        });
      },
    },
    {
      id: 4,
      name: "Delete Account",
      icon: "trash-bin-outline",
      color: Colors.red,
      onPress: () => {
        setDialogDetails({
          title: "Delete Account",
          content:
            "Are you sure you want to delete your account?\nAll your data will be lost. \n\nNote: You will not be eligible to another promo code upon account creation with the same phone number.",
          button1Text: "Cancel",
          button2Text: "Delete",
          windowColor: Colors.red,
          shadeColor: Colors.redShade,
          lightColor: Colors.redLight,
          onButton1Press: () => setDialogDetails(null),
          onButton2Press: async () => {
            const idToken = await currentUser.getIdToken();
            setIsLoading(true);
            try {
              await deleteAccount(idToken);
              signOut();
              setSnackbarData({
                message: "Account deleted successfully",
              });
            } catch (error) {
              setSnackbarData({
                message: error.message,
              });
            } finally {
              setIsLoading(false);
              setDialogDetails(null);
            }
          },
        });
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
            color={item.color}
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
        visible={!!dialogDetails}
        onClose={() => setDialogDetails(null)}
        title={dialogDetails?.title}
        button1Text="Cancel"
        button2Text={dialogDetails?.button2Text}
        onButton1Press={() => setDialogDetails(null)}
        onButton2Press={dialogDetails?.onButton2Press}
        windowColor={dialogDetails?.windowColor}
        shadeColor={dialogDetails?.shadeColor}
        lightColor={dialogDetails?.lightColor}
        isLoading={isLoading}
      >
        <Text>{dialogDetails?.content}</Text>
      </MiddleModalScreen>
    </View>
  );
}
