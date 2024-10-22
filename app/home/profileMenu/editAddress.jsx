import React from "react";
import { useRoute } from "@react-navigation/native";
import EditAddressScreen from "@/components/Screens/Home/ProfileMenu/EditAddressScreen";

export default function editAddress() {
  const route = useRoute();
  const { address } = route.params;

  return <EditAddressScreen address={address} />;
}
