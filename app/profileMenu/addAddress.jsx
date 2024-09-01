import React, { useEffect, useCallback } from "react";
import { useNavigation } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import { useQueryClient } from "react-query";
import AddressForm from "../../components/Address/AddressForm";

export default function addAddress() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const { user } = useUser();

  const createAddress = useCallback(
    async (addressValues) => {
      const userRef = doc(db, "Users", user.id);

      await updateDoc(userRef, {
        addresses: arrayUnion(addressValues),
      });

      queryClient.invalidateQueries("addresses");
      navigation.goBack();
    },
    [user.id, db]
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Address",
      headerShown: true,
      headerBackTitle: "Addresses",
    });
  }, []);

  return (
    <AddressForm
      title="Add New Address"
      buttonText="Add Address"
      initialValues={{
        name: "",
        city: "",
        street: "",
        number: "",
      }}
      onSubmit={createAddress}
    />
  );
}
