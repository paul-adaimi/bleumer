import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";

export default function useUser(userId) {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userRef = firestore().collection("Users").doc(userId);

    const unsubscribe = userRef.onSnapshot(
      (querySnapshot) => {
        setUser(querySnapshot.data());
        setIsLoading(false);
      },
      (err) => {
        setError(err);
        setIsLoading(false);
      }
    );

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, [userId]);

  return { user, error, isLoading };
}
