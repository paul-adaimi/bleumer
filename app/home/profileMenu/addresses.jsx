import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Colors } from "@/constants/Colors";
import AddressItem from "@/components/Address/AddressItem";
import { useRouter } from "expo-router";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useAddress } from "@/components/AddressProvider";

const AddressList = () => {
  const router = useRouter();

  const { addresses, isFetching } = useAddress();

  if (isFetching) {
    let loadingPage = [];
    for (let i = 0; i < 20; i++) {
      loadingPage.push(
        <View key={i}>
          <SkeletonPlaceholder.Item
            marginVertical={10}
            width={"100%"}
            height={40}
            borderBottomWidth={1}
            borderBottomColor={"#ccc"}
          />
          <View
            style={{
              width: "100%",
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
            }}
          />
        </View>
      );
    }
    return (
      <View style={{ padding: 15 }}>
        <SkeletonPlaceholder borderRadius={4}>
          {loadingPage}
        </SkeletonPlaceholder>
      </View>
    );
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
          onPress={() => router.push("home/profileMenu/addAddress")}
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
