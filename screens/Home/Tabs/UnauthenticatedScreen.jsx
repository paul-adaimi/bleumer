import { View, Text } from "react-native";
import { useNavigation, useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import LoadingButton from "@/components/LoadingButton";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function UnauthenticatedScreen({ page }) {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerShown: true,
      });
    }, [navigation])
  );

  return (
    <View
      style={{
        display: "flex",
        height: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <View
          style={{
            padding: 15,
            backgroundColor: Colors.primary,
            borderRadius: 100,
          }}
        >
          <Ionicons
            style={{
              opacity: 1,
            }}
            name="person"
            size={100}
            color={Colors.white}
          />
          <Ionicons
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              opacity: 0.9,
            }}
            name="ban"
            size={130}
            color={Colors.primaryShade}
          />
        </View>
        <Text
          style={{
            marginTop: 20,
            fontSize: 20,
            textAlign: "center",
            fontWeight: "bold",
            color: Colors.primary,
          }}
        >
          You need to be signed in to view your {page}!
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        <Text
          style={{
            marginTop: 100,
            fontSize: 16,
            textAlign: "center",
            color: Colors.primary,
          }}
        >
          Please sign in or create an account to continue.
        </Text>
        <LoadingButton
          text="Log in"
          style={{
            paddingVertical: 10,
            marginTop: 20,
            width: "100%",
            borderRadius: 99,
          }}
          onPress={() => {
            navigation.navigate("login");
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              style={{
                marginLeft: -20,
              }}
              name="log-in-outline"
              size={40}
              color={Colors.white}
            />
            <Text
              style={{
                color: Colors.white,
                fontSize: 20,
                marginLeft: 10,
                fontWeight: "700",
              }}
            >
              Sign in
            </Text>
          </View>
        </LoadingButton>
      </View>
    </View>
  );
}
