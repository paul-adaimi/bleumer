import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const AddressItemModal = ({ address, isSelected, onClick }) => {
  return (
    <TouchableOpacity
      style={{
        borderLeftWidth: isSelected ? 5 : 0,
        borderColor: Colors.primary,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: isSelected ? 5 : 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
      }}
      onPress={onClick}
    >
      <View>
        <Ionicons
          color={isSelected ? Colors.primary : Colors.gray}
          name="home"
          size={25}
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{address.name}</Text>
        <Text style={styles.address}>{address.street}</Text>
      </View>
      <View style={styles.actionsContainer}></View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  detailsContainer: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontSize: 18,
  },
  address: {
    color: "#888",
    fontSize: 16,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    color: "teal",
    marginRight: 20,
    fontSize: 16,
  },
  deleteButton: {
    color: "red",
    fontSize: 16,
  },
});

export default AddressItemModal;
