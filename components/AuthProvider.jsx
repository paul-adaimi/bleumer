import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

// Create the context
const AuthContext = createContext();

// Create the provider component
export default AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(auth().currentUser);
  const [confirmation, setConfirmation] = useState(null);
  const [verifyingNumber, setVerifyingNumber] = useState(false);

  const createFirebaseUser = useCallback(async () => {
    const userRef = firestore().collection("Users").doc(currentUser.uid);
    const userSnap = await userRef.get();

    if (!userSnap.exists) {
      await userRef.set({
        number: currentUser.phoneNumber,
        promoCodes: [{ code: "BLEUMER20", discount: 20 }],
        addresses: [],
      });
    }
  }, [currentUser]);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return subscriber;
  }, []);

  useEffect(() => {
    if (currentUser) {
      createFirebaseUser();
    }
  }, [createFirebaseUser]);

  const isSignedIn = useMemo(() => !!currentUser, [currentUser]);

  const signInWithPhoneNumber = useCallback(
    async (phoneNumber, { onSuccess, onError }) => {
      try {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        setConfirmation(confirmation);
        setVerifyingNumber(phoneNumber);
        onSuccess?.(confirmation);
      } catch (error) {
        onError?.(error);
      }
    },
    []
  );

  const confirmCode = useCallback(
    async (code, { onSuccess, onError }) => {
      try {
        const user = await confirmation.confirm(code);
        onSuccess?.(user);
      } catch (error) {
        onError?.(error);
      }
    },
    [confirmation]
  );

  const signOut = useCallback(async () => {
    await auth().signOut();
  }, []);

  const updateName = useCallback(
    async (name) => {
      try {
        await currentUser.updateProfile({ displayName: name });
        setCurrentUser(auth().currentUser);
        const userRef = firestore().collection("Users").doc(currentUser.uid);
        await userRef.update({ fullName: name });
      } catch (error) {
        throw error;
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
