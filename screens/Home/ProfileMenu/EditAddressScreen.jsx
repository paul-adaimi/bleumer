import React, { useCallback } from "react";
import { useNavigation } from "expo-router";
import AddressForm from "@/components/Address/AddressForm";
import { useAddress } from "@/components/AddressProvider";

export default function EditAddressScreen({ address }) {
  const navigation = useNavigation();
  const { editAddress } = useAddress();

  const editAddressAndGoBack = useCallback(
    async (addressValues) => {
      await editAddress(addressValues);
      navigation.goBack();
    },
    [navigation, editAddress]
  );

  return (
    <AddressForm
      title="Edit Address"
      buttonText="Edit Address"
      initialValues={address}
      onSubmit={editAddressAndGoBack}
    />
  );
}
