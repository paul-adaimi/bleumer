import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import auth from "@react-native-firebase/auth";
import updateUserName from "@/queries/updateUserName";
import { useSnackbar } from "@/components/SnackbarProvider";
import * as Sentry from "@sentry/react-native";

// Create the context
const AuthContext = createContext();

// Create the provider component
export default AuthProvider = ({ children }) => {
  const { setSnackbarData } = useSnackbar();
  const [currentUser, setCurrentUser] = useState(auth().currentUser);
  const [verifyingNumber, setVerifyingNumber] = useState(false);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return subscriber;
  }, []);

  const isSignedIn = useMemo(() => !!currentUser, [currentUser]);

  const signInWithPhoneNumber = useCallback(
    async (phoneNumber, { onSuccess, onError }) => {
      try {
        const response = await fetch(
          "https://europe-west1-bleumer-d477c.cloudfunctions.net/verifyUser",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phoneNumber, action: "send" }),
          }
        );
        const data = await response.json();
        if (!response.ok) {
          onError?.(new Error(data.message));
          return;
        }
        setVerifyingNumber(phoneNumber);
        onSuccess?.();
      } catch (error) {
        onError?.(error);
      }
    },
    []
  );

  const confirmCode = useCallback(
    async (code, { onSuccess, onError }) => {
      try {
        const response = await fetch(
          "https://europe-west1-bleumer-d477c.cloudfunctions.net/verifyUser",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              phoneNumber: verifyingNumber,
              code,
              action: "verify",
            }),
          }
        );

        const data = await response.json();
        if (!response.ok) {
          onError?.(new Error(data.message));
          return;
        }

        const { token } = data;

        const user = await auth().signInWithCustomToken(token);
        onSuccess?.(user);
      } catch (error) {
        onError?.(error);
      }
    },
    [verifyingNumber]
  );

  const signOut = useCallback(async () => {
    await auth().signOut();
  }, []);

  const updateName = useCallback(
    async (name) => {
      try {
        await currentUser.updateProfile({ displayName: name });
        setCurrentUser(auth().currentUser);
        const idToken = await currentUser.getIdToken();
        await updateUserName(idToken, { userName: name });
      } catch (error) {
        if (!__DEV__) Sentry.captureException(error);
        setSnackbarData({
          message: error.message,
        });
      }
    },
    [currentUser]
  );

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        verifyingNumber,
        signInWithPhoneNumber,
        confirmCode,
        isSignedIn,
        signOut,
        updateName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
