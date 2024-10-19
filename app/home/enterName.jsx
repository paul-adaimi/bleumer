import { View, Text, StyleSheet, TextInput } from "react-native";
import React, { useCallback, useState } from "react";
import { useNavigation, useFocusEffect, Redirect } from "expo-router";
import { useAuth } from "@/components/AuthProvider";
import LoadingButton from "@/components/LoadingButton";
import { Colors } from "@/constants/Colors";
import CustomTextInput from "@/components/CustomTextInput";
import { Formik } from "formik";
import * as Yup from "yup";

const nameValidationSchema = Yup.object({
  name: Yup.string()
    .min(5, "Must be More than 5 characters")
    .required("This field is required"),
});

export default function enterName() {
  const navigation = useNavigation();
  const { currentUser, updateName } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerShown: false,
      });
    }, [navigation])
  );

  const onSubmit = async (values) => {
    setIsLoading(true);
    try {
      await updateName(values.name);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  if (currentUser.displayName) {
    return <Redirect href={"/home/home"} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome!</Text>
      <Text style={styles.promptText}>Please enter your full name</Text>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(values) => onSubmit(values)}
        validationSchema={nameValidationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <CustomTextInput
              name="name"
              value={values.name}
              placeholder="Full Name"
              onChangeText={handleChange("name")}
              onBlur={handleBlur("name")}
              error={touched.name && errors.name}
              containerStyle={styles.input}
              autoFocus
            />
            <LoadingButton
              isLoading={isLoading}
              style={styles.button}
              onPress={handleSubmit}
              text="Submit"
            />
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  welcomeText: {
    marginTop: 50,
    fontSize: 32,
    color: Colors.primary,
    fontWeight: "bold",
  },
  promptText: {
    marginTop: 50,
    color: Colors.primaryLight,
    fontSize: 16,
  },
  input: {
    width: "100%",
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
    width: "100%",
  },
});
