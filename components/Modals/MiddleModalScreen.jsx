import React from "react";
import { Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors";
import LoadingButton from "../LoadingButton";

const MiddleModalScreen = ({
  visible,
  onClose,
  button1Text = "Button 1", // Default text for the first button
  button2Text = "Button 2", // Default text for the second button
  onButton1Press,
  onButton2Press,
  windowColor,
  shadeColor,
  lightColor,
  children,
  title,
  isLoading = false,
}) => {
  const areButtonsVisible = onButton1Press || onButton2Press;
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View
            style={{
              ...styles.modalHeader,
              backgroundColor: windowColor || Colors.primary,
            }}
          >
            <Text style={styles.titleText}>{title}</Text>
            <TouchableOpacity
              disabled={isLoading}
              onPress={onClose}
              style={styles.closeButton}
            >
              <MaterialIcons name="close" color="#fff" size={22} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalContent}>{children}</View>

          {areButtonsVisible && (
            <View style={styles.buttonsContainer}>
              {onButton1Press && (
                <TouchableOpacity
                  style={styles.button1}
                  onPress={onButton1Press}
                  disabled={isLoading}
                >
                  <Text style={styles.buttonText}>{button1Text}</Text>
                </TouchableOpacity>
              )}

              {onButton2Press && (
                <LoadingButton
                  style={styles.button2}
                  onPress={onButton2Press}
                  isLoading={isLoading}
                  text={button2Text}
                  mainColor={windowColor}
                  shadeColor={shadeColor}
                  lightColor={lightColor}
                ></LoadingButton>
              )}
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  titleText: {
    color: "white",
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 32,
    textAlign: "center",
  },
  closeButton: {
    padding: 5,
  },
  modalContent: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  button1: {
    flex: 1,
    backgroundColor: Colors.gray,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",

    // Shadow for iOS
    shadowColor: Colors.black,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    // Shadow for Android
    elevation: 5,
  },
  button2: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default MiddleModalScreen;
