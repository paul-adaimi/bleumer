import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";

export default function useUserOrders(userId) {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userRef = firestore().collection("Orders").doc(userId);

    const unsubscribe = userRef.onSnapshot(
      (docSnapshot) => {
        if (docSnapshot.exists) {
          const fetchedOrders = docSnapshot.data().orders || [];
          setOrders(fetchedOrders.reverse());
        } else {
          setError(new Error("User not found"));
        }
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

  return { orders, error, isLoading };
}
