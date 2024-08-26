import React, { useEffect, useCallback } from "react";
import { useNavigation } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import { useQueryClient } from "react-query";
import AddressForm from "../../components/Address/AddressForm";
import { useRoute } from "@react-navigation/native";

export default function editAddress() {
  const route = useRoute();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const { index, allAddresses } = route.params;

  const { user } = useUser();

  const onEditAddress = useCallback(
    async (addressValues) => {
      const addresses = [...allAddresses];
      addresses[index] = addressValues;
      const userRef = doc(db, "Users", user.id);

      await updateDoc(userRef, {
        addresses,
      });

      queryClient.invalidateQueries("addresses");
      navigation.goBack();
    },
    [user.id, db]
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Edit Address",
      headerShown: true,
      headerBackTitle: "Addresses",
    });
  }, []);

  return (
    <AddressForm
      title="Edit Address"
      buttonText="Edit Address"
      initialValues={allAddresses[index]}
      onSubmit={onEditAddress}
    />
  );
}
