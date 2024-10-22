import React, { useCallback } from "react";
import { useNavigation, useFocusEffect, Redirect } from "expo-router";
import { useAuth } from "@/components/AuthProvider";
import EnterNameScreen from "@/screens/Home/EnterNameScreen";

export default function enterName() {
  const navigation = useNavigation();
  const { currentUser } = useAuth();

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, [navigation])
  );

  if (currentUser.displayName) {
    return <Redirect href={"/home/home"} />;
  }

  return <EnterNameScreen />;
}
