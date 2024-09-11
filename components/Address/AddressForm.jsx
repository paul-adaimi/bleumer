import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { Colors } from "@/constants/Colors";
import MapView, { Marker } from "react-native-maps";
import CustomTextInput from "../../components/CustomTextInput";
import * as Location from "expo-location";

export default function AddressForm({
  initialValues,
  onSubmit,
  title,
  buttonText,
}) {
  const [initialRegion, setInitialRegion] = useState(null);
  const [screenHeight] = useState(Dimensions.get("window").height);

  const [addressValues, setAddressValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const scrollViewRef = useRef(null);
  const inputRefs = useRef([]);

  // Function to scroll to the TextInput when it is focused
  const scrollToInput = (index) => {
    const input = inputRefs.current[index];

    const scrollToFocusedInput = (keyboardHeight) => {
      const availableSpace = screenHeight - (keyboardHeight + 100); // 100 is for the navigation header

      input.measureLayout(scrollViewRef.current, (x, y, width, height) => {
        scrollViewRef.current.scrollTo({
          y: y - (availableSpace - height),
          animated: true,
        });
      });
    };

    // Wait for the keyboard to fully open
    const keyboardListener = Keyboard.addListener("keyboardDidShow", (e) => {
      scrollToFocusedInput(e.endCoordinates.height);
      keyboardListener.remove();
    });
  };

  useEffect(() => {
    if (initialValues.coordinates) {
      setInitialRegion({
        latitude: initialValues.coordinates.latitude,
        longitude: initialValues.coordinates.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    } else {
      const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }

        let location = await Location.getCurrentPositionAsync({});

        setInitialRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      };

      getLocation();
    }
  }, []);

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

    ["name", "city", "street", "number"].forEach((key) => {
      if (!addressValues[key]?.trim()) {
        newErrors[key] = "This field is required";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      onSubmit(addressValues);
    }
  };

  handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setAddressValues((prevValues) => ({
      ...prevValues,
      coordinates: coordinate,
    }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
      }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          ref={scrollViewRef}
          style={{
            flexGrow: 1,
          }}
        >
          <View
            style={{
              padding: 20,
              display: "flex",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 25 }}>{title}</Text>
              <Text style={{ color: Colors.gray }}>
                Fill all details in order to add new address
              </Text>
              <MapView
                style={{ width: "100%", height: 300, marginTop: 10 }}
                showsUserLocation
                initialRegion={initialRegion}
                onPress={handleMapPress}
              >
                {addressValues.coordinates && (
                  <Marker
                    coordinate={addressValues.coordinates}
                    title="Your Location"
                    description="Accurately place the marker"
                  />
                )}
              </MapView>
              <Text
                style={{
                  marginLeft: 5,
                  marginTop: 5,
                  color: Colors.gray,
                }}
              >
                Place the marker in order to continue
              </Text>
              <View style={{ display: "flex", marginTop: 10 }}>
                <CustomTextInput
                  key="name"
                  value={addressValues.name || ""}
                  placeholder="Address Name"
                  onChangeText={(value) => handleInputChange("name", value)}
                  onFocus={() => scrollToInput(0)}
                  ref={(el) => (inputRefs.current[0] = el)}
                  error={errors.name}
                />
                <CustomTextInput
                  key="city"
                  value={addressValues.city || ""}
                  placeholder="City"
                  onChangeText={(value) => handleInputChange("city", value)}
                  onFocus={() => scrollToInput(1)}
                  ref={(el) => (inputRefs.current[1] = el)}
                  error={errors.city}
                />
                <CustomTextInput
                  key="street"
                  value={addressValues.street || ""}
                  placeholder="Street / Building / Floor"
                  onChangeText={(value) => handleInputChange("street", value)}
                  onFocus={() => scrollToInput(2)}
                  ref={(el) => (inputRefs.current[2] = el)}
                  error={errors.street}
                />
                <CustomTextInput
                  key="number"
                  value={addressValues.number || ""}
                  placeholder="Phone Number"
                  onChangeText={(value) => handleInputChange("number", value)}
                  onFocus={() => scrollToInput(3)}
                  ref={(el) => (inputRefs.current[3] = el)}
                  error={errors.number}
                />
              </View>
            </View>

            <View>
              <TouchableOpacity
                disabled={!addressValues.coordinates}
                onPress={handleSubmit}
                style={{
                  backgroundColor: addressValues.coordinates
                    ? Colors.primary
                    : "#D3D3D3",
                  padding: 16,
                  borderRadius: 5,
                  marginBottom: 15,
                }}
              >
                <Text style={{ textAlign: "center", color: "#FFF" }}>
                  {buttonText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
