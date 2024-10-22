import React, { useCallback } from "react";
import { useNavigation } from "expo-router";
import AddressForm from "@/components/Address/AddressForm";
import { useAddress } from "@/components/AddressProvider";
import * as Crypto from "expo-crypto";

export default function AddAddressScreen() {
  const navigation = useNavigation();

  const { createAddress } = useAddress();

  const createAddressAndGoBack = useCallback(
    async (addressValues) => {
      await createAddress(addressValues);
      navigation.goBack();
    },
    [navigation, createAddress]
  );

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
