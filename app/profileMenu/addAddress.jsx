import React, { useEffect, useCallback } from "react";
import { useNavigation } from "expo-router";
import AddressForm from "../../components/Address/AddressForm";
import { useRoute } from "@react-navigation/native";
import { useAddress } from "../../components/AddressProvider";
import * as Crypto from "expo-crypto";

export default function addAddress() {
  const navigation = useNavigation();
  const route = useRoute();

  const { backTitle } = route.params;

  const { createAddress } = useAddress();

  const createAddressAndGoBack = useCallback(
    (addressValues) => {
      createAddress(addressValues);
      navigation.goBack();
    },
    [navigation]
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Address",
      headerShown: true,
      headerBackTitle: backTitle ? backTitle : "Addresses",
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
        coordinates: null,
        id: Crypto.randomUUID(),
      }}
      onSubmit={createAddressAndGoBack}
    />
  );
}
