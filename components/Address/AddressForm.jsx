import {
  View,
  Text,
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
import CustomTextInput from "@/components/CustomTextInput";
import * as Location from "expo-location";
import CustomPicker from "@/components/CustomPicker";
import { useQuery } from "react-query";
import fetchAreas from "@/queries/fetchAreas";
import { Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import LoadingButton from "@/components/LoadingButton";

// TODO: change logo (in notification as well)

const addressValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Must be between 3 and 15 characters")
    .max(15, "Must be between 3 and 15 characters")
    .required("This field is required"),
  street: Yup.string()
    .min(5, "Must be between 5 characters or more")
    .required("This field is required"),
  number: Yup.string()
    .min(8, "Must be exactly 8 digits")
    .max(8, "Must be exactly 8 digits"),
  city: Yup.object().required("This field is required"),
  coordinates: Yup.object().required("Must place the marker on the map"),
});

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
  } = useQuery("areas", async () => fetchAreas(), {
    staleTime: 1000 * 60 * 60 * 24,
    cacheTime: 1000 * 60 * 60 * 24,
  });

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

  const scrollViewRef = useRef(null);
  const inputRefs = useRef([]);

  // Function to scroll to the TextInput when it is focused
  const scrollToInput = (index) => {
    const input = inputRefs.current[index];

    const scrollToFocusedInput = (keyboardHeight) => {
      const availableSpace = screenHeight - (keyboardHeight + 210); // 100 is for the navigation header

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
  }, [initialValues]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
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
          <Formik
            initialValues={{ ...initialValues }}
            onSubmit={(values) => onSubmit(values)}
            validationSchema={addressValidationSchema}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
              isSubmitting,
            }) => (
              <>
                <ScrollView
                  ref={scrollViewRef}
                  showsVerticalScrollIndicator={false}
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
                      <Text style={{ color: Colors.gray, marginTop: 5 }}>
                        Place marker & fill all details in order to continue
                      </Text>
                      <MapView
                        style={{
                          width: "100%",
                          height: 300,
                          marginTop: 10,
                          borderWidth: errors.coordinates ? 1 : 0,
                          borderColor: "red",
                        }}
                        showsUserLocation
                        initialRegion={initialRegion}
                        onPress={(event) => {
                          const { coordinate } = event.nativeEvent;
                          setFieldValue("coordinates", coordinate);
                        }}
                      >
                        {values.coordinates && (
                          <Marker
                            coordinate={values.coordinates}
                            title="Your Location"
                            description="Accurately place the marker"
                          />
                        )}
                      </MapView>
                      {errors.coordinates && (
                        <Text
                          style={{
                            color: "red",
                            paddingTop: 5,
                            fontSize: 14,
                          }}
                        >
                          Error: {errors.coordinates}
                        </Text>
                      )}
                      <View style={{ display: "flex", marginTop: 10 }}>
                        <CustomTextInput
                          name="name"
                          value={values.name}
                          placeholder="Address Name"
                          onChangeText={handleChange("name")}
                          onFocus={() => scrollToInput(0)}
                          onBlur={handleBlur("name")}
                          ref={(el) => (inputRefs.current[0] = el)}
                          error={touched.name && errors.name}
                        />
                        <CustomPicker
                          name="city"
                          placeholder="Select an area"
                          items={options}
                          selectedValue={values.city}
                          onValueChange={(value) =>
                            setFieldValue("city", value)
                          }
                          error={touched.city && errors.city}
                        />
                        {values.city.businessDays > 1 && (
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
                            <Text
                              style={{
                                color: Colors.warningGold,
                                fontSize: 15,
                              }}
                            >
                              This order might take up to{" "}
                              {values.city.businessDays} business days to
                              deliver.
                            </Text>
                          </View>
                        )}
                        <CustomTextInput
                          id="name"
                          name="name"
                          value={values.street}
                          placeholder="Street / Building / Floor"
                          onChangeText={handleChange("street")}
                          onBlur={handleBlur("street")}
                          onFocus={() => scrollToInput(2)}
                          ref={(el) => (inputRefs.current[2] = el)}
                          error={touched.street && errors.street}
                        />
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "baseline",
                          }}
                        >
                          <CustomTextInput
                            key="pre-number"
                            keyboardType="numeric"
                            value={"+961"}
                            editable={false}
                          />
                          <CustomTextInput
                            id="number"
                            name="number"
                            keyboardType="numeric"
                            value={values.number}
                            placeholder="Phone Number (optional)"
                            onChangeText={handleChange("number")}
                            onFocus={() => scrollToInput(3)}
                            onBlur={handleBlur("number")}
                            ref={(el) => (inputRefs.current[3] = el)}
                            error={touched.number && errors.number}
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
                <View style={{ position: "relative", bottom: 10 }}>
                  <LoadingButton
                    isLoading={isSubmitting}
                    onPress={handleSubmit}
                    text={buttonText}
                  />
                </View>
              </>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
