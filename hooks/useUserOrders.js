import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";

export default function useUserOrders(userId) {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const ordersRef = firestore()
      .collection(`Orders/${userId}/orders`)
      .orderBy("orderTime", "desc");

    const unsubscribe = ordersRef.onSnapshot(
      (querySnapshot) => {
        const fetchedOrders = [];

        querySnapshot.forEach((doc) => {
          fetchedOrders.push({
            ...doc.data(),
            orderId: doc.id, // Include orderId for easier reference
          });
        });

        setOrders(fetchedOrders); // Reverse to show the latest orders first
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
