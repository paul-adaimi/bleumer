import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { useAddress } from "../AddressProvider";
import { useNavigation } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import AddressItemModal from "../Address/AddressItemModal";

export default function AddressesModal({ onClose }) {
  const { addresses, currentAddress, setCurrentAddress, isFetching } =
    useAddress();

  const navigation = useNavigation();

  const addAddressHandler = () => {
    navigation.navigate("profileMenu/addAddress");
    onClose();
  };

  return (
    <View
      style={{
        padding: 10,
      }}
    >
      <TouchableOpacity
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          padding: 10,
        }}
        onPress={addAddressHandler}
      >
        <Ionicons name="add" size={25} />
        <Text
          style={{
            marginLeft: 10,
            fontSize: 16,
          }}
        >
          Add New Address
        </Text>
      </TouchableOpacity>

      {!isFetching && (
        <FlatList
          data={addresses}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <AddressItemModal
              onClick={() => {
                setCurrentAddress(item);
                onClose();
              }}
              isSelected={currentAddress === item}
              key={index}
              address={item}
            />
          )}
        />
      )}
    </View>
  );
}
