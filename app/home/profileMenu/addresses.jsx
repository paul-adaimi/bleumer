import React from "react";
import { View, Text, FlatList } from "react-native";
import AddressItem from "@/components/Address/AddressItem";
import { useRouter } from "expo-router";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useAddress } from "@/components/AddressProvider";
import LoadingButton from "@/components/LoadingButton";

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
        showsVerticalScrollIndicator={false}
        data={addresses}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <AddressItem index={index} address={item} />
        )}
      />
      <View style={{ position: "relative", bottom: 10, padding: 15 }}>
        <LoadingButton
          onPress={() => router.push("home/profileMenu/addAddress")}
          text="Add Address"
        />
      </View>
    </View>
  );
};

export default AddressList;
