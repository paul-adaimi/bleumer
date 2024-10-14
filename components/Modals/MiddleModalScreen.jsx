import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Colors } from "@/constants/Colors";

const MiddleModalScreen = ({
  visible,
  onClose,
  button1Text = "Button 1", // Default text for the first button
  button2Text = "Button 2", // Default text for the second button
  onButton1Press,
  onButton2Press,
  children,
  title,
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
          <View style={styles.modalHeader}>
            <Text style={styles.titleText}>{title}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
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
                >
                  <Text style={styles.buttonText}>{button1Text}</Text>
                </TouchableOpacity>
              )}

              {onButton2Press && (
                <TouchableOpacity
                  style={styles.button2}
                  onPress={onButton2Press}
                >
                  <Text style={styles.buttonText}>{button2Text}</Text>
                </TouchableOpacity>
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
    backgroundColor: Colors.primary,
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
  },
  button1: {
    flex: 1,
    backgroundColor: Colors.gray,
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
  button2: {
    flex: 1,
    backgroundColor: Colors.primary,
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
