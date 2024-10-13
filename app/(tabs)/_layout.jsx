import { View, Text } from "react-native";
import React, { useCallback, useEffect } from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../constants/Colors";
import { useUser } from "@clerk/clerk-expo";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";

export default function TabLayout() {
  const { user } = useUser();

  const createFirebaseUser = useCallback(async () => {
    const userRef = doc(db, "Users", user.id);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(doc(db, "Users", user.id), {
        name: user.fullName,
        promoCodes: [{ code: "BLEUMER20", discount: 20 }],
        addresses: [],
      });
    }
  }, []);

  useEffect(() => {
    createFirebaseUser();
  }, [createFirebaseUser]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          tabBarLabel: "Orders",
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="people" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
