import React, { useEffect } from "react";
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
import fetchUserAddresses from "@/queries/fetchUserAddresses";
import { useRouter } from "expo-router";

const AddressList = () => {
  const { user } = useUser();
  const router = useRouter();

  const {
    data: addresses,
    error,
    isFetching,
  } = useQuery("addresses", async () => fetchUserAddresses(user.id));

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "All Addresses",
      headerShown: true,
      headerBackTitle: "Profile",
    });
  }, []);

  if (isFetching) {
    return <Text>Loading addresses...</Text>;
  }

  return (
    <View style={{ height: "100%" }}>
      {!addresses.length && (
        <View
          style={{
            marginTop: 15,
            display: "flex",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text>No addresses found.</Text>
        </View>
      )}
      <FlatList
        data={addresses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <AddressItem allAddresses={addresses} index={index} address={item} />
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
