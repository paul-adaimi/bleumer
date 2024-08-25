import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "react-query";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "@/constants/Colors";
import AddressItem from "../../components/Address/AddressItem";
import fetchUserAddresses from "../queries/fetchUserAddresses";
import { useRouter } from "expo-router";

const AddressList = () => {
  const { user } = useUser();
  const router = useRouter();

  const {
    data: addresses,
    error,
    isLoading,
  } = useQuery("addresses", async () => fetchUserAddresses(user.id));

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "All Addresses",
      headerShown: true,
      headerBackTitle: "Profile",
    });
  }, []);

  if (isLoading) {
    return <Text>Loading addresses...</Text>;
  }

  //   if (addresses.length === 0) {
  //     return <Text>No addresses found.</Text>;
  //   }

  return (
    <View style={{ height: "100%" }}>
      <FlatList
        data={addresses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <AddressItem index={index} address={item} />
        )}
      />
      <View
        style={{
          padding: 15,
          paddingBottom: 35,
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            padding: 16,
            borderRadius: 5,
          }}
          onPress={() => router.push("/profileMenu/addAddress")}
        >
          <Text style={{ textAlign: "center", color: "#FFF" }}>
            {" "}
            Add Address
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  addressContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "#f9f9f9",
  },
  addressText: {
    fontSize: 16,
  },
});

export default AddressList;
