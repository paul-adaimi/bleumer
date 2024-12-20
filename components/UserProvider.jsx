import React, { createContext, useContext, useMemo, useEffect } from "react";
import { Platform } from "react-native";
import { useAuth } from "@/components/AuthProvider";
import useUser from "../hooks/useUser";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Sentry from "@sentry/react-native";
import updateNotificationToken from "@/queries/updateNotificationToken";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Create a context for user-related data
const UserContext = createContext();

// Create the UserProvider component
export const UserProvider = ({ children }) => {
  const { currentUser } = useAuth();

  const { user } = useUser(currentUser.uid);

  // Fetch promo codes for the user
  const promoCodes = useMemo(() => {
    return user?.promoCodes || [];
  }, [user]);

  useEffect(() => {
    const updateTokenFirebase = async () => {
      try {
        if (!user || !currentUser) return;
        const notificationToken = await registerForPushNotificationsAsync();
        if (notificationToken) {
          const idToken = await currentUser.getIdToken();
          if (user.notificationToken !== notificationToken) {
            updateNotificationToken(idToken, { notificationToken });
          }
        }
      } catch (error) {
        if (!__DEV__) Sentry.captureException(error);
      }
    };

    updateTokenFirebase();
  }, [user, currentUser]);

  return (
    <UserContext.Provider
      value={{
        user,
        promoCodes,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
  return useContext(UserContext);
};

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    if (!projectId) {
      return;
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(pushTokenString);
      return pushTokenString;
    } catch (e) {
      throw new Error(`Error getting push token: ${e}`);
    }
  } else {
    throw new Error("Must use physical device for push notifications");
  }
}
