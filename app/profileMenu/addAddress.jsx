import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "@/constants/Colors";
import MapView from "react-native-maps";
import CustomTextInput from "../../components/CustomTextInput";
import { useUser } from "@clerk/clerk-expo";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";

const initialValues = {
  name: "",
  city: "",
  street: "",
  number: "",
};

export default function addAddress() {
  const navigation = useNavigation();

  const [addressValues, setAddressValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const { user } = useUser();

  const createAddress = useCallback(async () => {
    const userRef = doc(db, "Users", user.id);

    await updateDoc(userRef, {
      addresses: arrayUnion(addressValues),
    });
  }, [user.id, db, addressValues]);

  const handleInputChange = (fieldName, value) => {
    setAddressValues((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));

    if (errors[fieldName]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [fieldName]: null,
      }));
    }
  };

  const handleSubmit = () => {
    let newErrors = {};

    Object.keys(addressValues).forEach((key) => {
      if (!addressValues[key]?.trim()) {
        newErrors[key] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      createAddress();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Address",
      headerShown: true,
      headerBackTitle: "Addresses",
    });
  }, []);

  return (
    <View
      style={{
        padding: 20,
        display: "flex",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <View>
        <Text style={{ fontWeight: "bold", fontSize: 25 }}>
          Add New Address
        </Text>
        <Text style={{ color: Colors.gray }}>
          Fill all details in order to add new address
        </Text>
        <MapView
          style={{ width: "100%", height: 300, marginTop: 10 }}
          showsUserLocation
          showsMyLocationButton
        />
        <View style={{ display: "flex", marginTop: 10 }}>
          <CustomTextInput
            key="name"
            value={addressValues.name || ""}
            placeholder="Address Name"
            onChangeText={(value) => handleInputChange("name", value)}
            isError={!!errors.name}
          />
          <CustomTextInput
            key="city"
            value={addressValues.city || ""}
            placeholder="City"
            onChangeText={(value) => handleInputChange("city", value)}
            isError={!!errors.city}
          />
          <CustomTextInput
            key="street"
            value={addressValues.street || ""}
            placeholder="Street / Building / Floor"
            onChangeText={(value) => handleInputChange("street", value)}
            isError={!!errors.street}
          />
          <CustomTextInput
            key="number"
            value={addressValues.number || ""}
            placeholder="Phone Number"
            onChangeText={(value) => handleInputChange("number", value)}
            isError={!!errors.number}
          />
        </View>
      </View>

      <View>
        <TouchableOpacity
          onPress={handleSubmit}
          style={{
            backgroundColor: Colors.primary,
            padding: 16,
            borderRadius: 5,
            marginBottom: 15,
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
