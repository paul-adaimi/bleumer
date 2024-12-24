import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "expo-router";
import { useAddress } from "@/components/AddressProvider";
import { Colors } from "@/constants/Colors";
import MiddleModalScreen from "@/components/Modals/MiddleModalScreen";

const AddressItem = ({ address }) => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const navigation = useNavigation();

  const { deleteAddress } = useAddress();

  const onEdit = () => {
    navigation.navigate("profileMenu/editAddress", {
      address,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{address.name}</Text>
        <Text style={styles.address}>{address.street}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={onEdit}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsDialogVisible(true)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
      <MiddleModalScreen
        visible={isDialogVisible}
        onClose={() => setIsDialogVisible(false)}
        title="Delete Address"
        button1Text="Cancel"
        button2Text="Delete"
        onButton1Press={() => setIsDialogVisible(false)}
        onButton2Press={() => {
          deleteAddress(address);
          setIsDialogVisible(false);
        }}
        windowColor={Colors.red}
      >
        <Text>Are you sure you want to delete this address?</Text>
      </MiddleModalScreen>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    color: Colors.primary,
    fontWeight: "600",
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
    color: "#FF3B30",
    fontSize: 16,
  },
});

export default AddressItem;
