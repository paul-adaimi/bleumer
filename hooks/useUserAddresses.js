import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";

export default function useUserAddresses(userId) {
  const [addresses, setAddresses] = useState([]);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const addressesRef = firestore()
      .collection(`Users/${userId}/addresses`)
      .orderBy("name", "desc");

    const unsubscribe = addressesRef.onSnapshot(
      (querySnapshot) => {
        const fetchedAddresses = [];

        let modifiedDocId = null;
        const docChanges = querySnapshot.docChanges();

        docChanges.forEach((change) => {
          if (
            docChanges.length === 1 &&
            (change.type === "added" || change.type === "modified")
          ) {
            modifiedDocId = change.doc.id;
          }
        });

        querySnapshot.forEach((doc) => {
          const address = {
            ...doc.data(),
            id: doc.id,
          };

          if (modifiedDocId === doc.id) {
            setCurrentAddress(address);
          }

          fetchedAddresses.push(address);
        });

        setAddresses(fetchedAddresses);
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

  return { addresses, error, isLoading, currentAddress, setCurrentAddress };
}
