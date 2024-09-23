import React, { useState, forwardRef } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

const CustomPicker = forwardRef(
  (
    {
      placeholder,
      items = [],
      error,
      style,
      selectedValue,
      onValueChange,
      ...props
    },
    ref
  ) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selected, setSelected] = useState(selectedValue || "");

    const handleSelect = (item) => {
      setSelected(item.value);
      onValueChange?.(item.value);
      setModalVisible(false);
    };

    const closeModal = () => setModalVisible(false);

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.input, style, error && styles.errorInput]}
          onPress={() => setModalVisible(true)}
        >
          <Text
            style={selectedValue ? styles.selectedText : styles.placeholder}
          >
            {selected
              ? items.find((item) => item.value === selected)?.label
              : placeholder}
          </Text>
          {!selectedValue && (
            <Ionicons name="caret-down" size={24} color="#a9a9a9" />
          )}
        </TouchableOpacity>

        {error && <Text style={styles.errorText}>Error: {error}</Text>}

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={closeModal}
        >
          <TouchableWithoutFeedback onPress={closeModal}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                  <FlatList
                    data={items}
                    keyExtractor={(item) => item.label}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.item}
                        onPress={() => handleSelect(item)}
                      >
                        <Text style={styles.itemText}>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => (
                      <View style={styles.separator} />
                    )}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 17,
    backgroundColor: "#FFF",
    borderColor: Colors.primary,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  placeholder: {
    fontSize: 17,
    color: "#a9a9a9",
    opacity: 0.75,
  },
  selectedText: {
    fontSize: 17,
    color: "#000",
  },
  errorText: {
    color: "red",
    marginTop: 5,
    fontSize: 14,
  },
  errorInput: {
    borderColor: "red",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 20,
    maxHeight: 300, // Set max height to make it scrollable
  },
  item: {
    paddingVertical: 15,
  },
  itemText: {
    fontSize: 18,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 5,
  },
});

export default CustomPicker;
