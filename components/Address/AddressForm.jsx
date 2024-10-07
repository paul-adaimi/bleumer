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
import React, { useEffect, useState, useRef, useMemo } from "react";
import { Colors } from "@/constants/Colors";
import MapView, { Marker } from "react-native-maps";
import CustomTextInput from "../../components/CustomTextInput";
import * as Location from "expo-location";
import CustomPicker from "../CustomPicker";
import { useQuery } from "react-query";
import fetchAreas from "@/queries/fetchAreas";
import { Ionicons } from "@expo/vector-icons";

export default function AddressForm({
  initialValues,
  onSubmit,
  title,
  buttonText,
}) {
  const {
    data: areas,
    error,
    isFetching,
  } = useQuery("areas", async () => fetchAreas());

  const options = useMemo(
    () =>
      areas
        ? areas.map((area) => ({
            label: area.name,
            value: area,
          }))
        : [],
    [areas]
  );

  const [initialRegion, setInitialRegion] = useState(null);
  const [screenHeight] = useState(Dimensions.get("window").height);

  const [addressValues, setAddressValues] = useState({ ...initialValues });
  const [errors, setErrors] = useState({});

  const scrollViewRef = useRef(null);
  const inputRefs = useRef([]);

  // Function to scroll to the TextInput when it is focused
  const scrollToInput = (index) => {
    const input = inputRefs.current[index];

    const scrollToFocusedInput = (keyboardHeight) => {
      const availableSpace = screenHeight - (keyboardHeight + 130); // 100 is for the navigation header

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

    ["name", "street", "number"].forEach((key) => {
      if (!addressValues[key]?.trim()) {
        newErrors[key] = "This field is required";
      }
    });

    if (!addressValues.city) {
      newErrors.city = "This field is required";
    }

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
        <View
          style={{
            padding: 20,
            flex: 1,
          }}
        >
          <ScrollView
            ref={scrollViewRef}
            style={{
              flexGrow: 1,
            }}
          >
            <View
              style={{
                paddingBottom: 80,
              }}
            >
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                  {title}
                </Text>
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
                  <CustomPicker
                    key="city"
                    placeholder="Select an area"
                    items={options}
                    selectedValue={addressValues.city}
                    onValueChange={(value) => handleInputChange("city", value)}
                    error={errors.city}
                  />
                  {addressValues.city.businessDays > 1 && (
                    <View
                      style={{
                        marginTop: 5,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Ionicons
                        name="warning-outline"
                        size={18}
                        color={Colors.warningGold}
                      />
                      <Text style={{ color: Colors.warningGold, fontSize: 15 }}>
                        This order will take {addressValues.city.businessDays}{" "}
                        business days to deliver.
                      </Text>
                    </View>
                  )}
                  <CustomTextInput
                    key="street"
                    value={addressValues.street || ""}
                    placeholder="Street / Building / Floor"
                    onChangeText={(value) => handleInputChange("street", value)}
                    onFocus={() => scrollToInput(2)}
                    ref={(el) => (inputRefs.current[2] = el)}
                    error={errors.street}
                  />
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <CustomTextInput
                      key="pre-number"
                      keyboardType="numeric"
                      value={"+961"}
                      editable={false}
                    />
                    <CustomTextInput
                      key="number"
                      keyboardType="numeric"
                      value={addressValues.number || ""}
                      placeholder="Phone Number"
                      onChangeText={(value) =>
                        handleInputChange("number", value)
                      }
                      onFocus={() => scrollToInput(3)}
                      ref={(el) => (inputRefs.current[3] = el)}
                      error={errors.number}
                      containerStyle={{
                        flex: 1,
                        marginLeft: 10,
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              position: "relative",
              bottom: 20,
            }}
          >
            <TouchableOpacity
              disabled={!addressValues.coordinates}
              onPress={handleSubmit}
              style={{
                backgroundColor: addressValues.coordinates
                  ? Colors.primary
                  : "#D3D3D3",
                padding: 16,
                borderRadius: 5,
              }}
            >
              <Text style={{ textAlign: "center", color: "#FFF" }}>
                {buttonText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
