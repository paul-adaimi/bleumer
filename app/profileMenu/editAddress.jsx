import React, { useEffect, useCallback } from "react";
import { useNavigation } from "expo-router";
import AddressForm from "../../components/Address/AddressForm";
import { useRoute } from "@react-navigation/native";
import { useAddress } from "../../components/AddressProvider";

export default function editAddress() {
  const route = useRoute();
  const navigation = useNavigation();
  const { editAddress } = useAddress();
  const { address } = route.params;

  const editAddressAndGoBack = useCallback(
    (addressValues) => {
      editAddress.mutate(addressValues);
      navigation.goBack();
    },
    [navigation]
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
      initialValues={address}
      onSubmit={editAddressAndGoBack}
    />
  );
}
