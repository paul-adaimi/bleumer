import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "@/constants/Colors";
import MapView from "react-native-maps";

export default function addAddress() {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Address",
      headerShown: true,
      headerBackTitle: "Addresses",
    });
  }, []);
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontWeight: "bold", fontSize: 25 }}> Add New Address</Text>
      <Text style={{ color: Colors.gray }}>
        Fill all details in order to add new address
      </Text>
      <MapView
        style={{ width: "100%", height: "50%" }}
        showsUserLocation
        showsMyLocationButton
      />
      <View style={{ display: "flex" }}>
        <TextInput
          placeholder="Address Name"
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#FFF",
            marginTop: 10,
            borderColor: Colors.primary,
          }}
        />
        <TextInput
          placeholder="City"
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#FFF",
            marginTop: 10,
            borderColor: Colors.primary,
          }}
        />
        <TextInput
          placeholder="Street / Building / Floor"
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#FFF",
            marginTop: 10,
            borderColor: Colors.primary,
          }}
        />
        <TextInput
          placeholder="Phone Number"
          style={{
            padding: 15,
            borderWidth: 1,
            borderRadius: 5,
            fontSize: 17,
            backgroundColor: "#FFF",
            marginTop: 10,
            borderColor: Colors.primary,
          }}
        />

        <TouchableOpacity
          onPress={() => {}}
          style={{
            backgroundColor: Colors.primary,
            padding: 16,
            borderRadius: 5,
            marginTop: 20,
          }}
        >
          <Text style={{ textAlign: "center", color: "#FFF" }}>
            {" "}
            Add Address
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
