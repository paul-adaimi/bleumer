import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useUser } from "@clerk/clerk-expo";
import { useMutation, useQueryClient } from "react-query";
import deleteUserAddress from "@/queries/deleteUserAddress";
import { useNavigation } from "expo-router";
import { Button, Dialog, Portal } from "react-native-paper";

const AddressItem = ({ address, index, allAddresses }) => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const { user } = useUser();
  const navigation = useNavigation();

  const queryClient = useQueryClient();

  const deleteAddress = useMutation(() => deleteUserAddress(user.id, index), {
    onSuccess: () => {
      queryClient.invalidateQueries("addresses");
    },
  });

  const onEdit = () => {
    navigation.navigate("profileMenu/editAddress", {
      index,
      allAddresses,
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
      <Portal>
        <Dialog
          visible={isDialogVisible}
          onDismiss={() => setIsDialogVisible(false)}
        >
          <Dialog.Title>Delete Address</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Are you sure you want to delete the address {address.name}?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setIsDialogVisible(false)}>Cancel</Button>
            <Button onPress={() => deleteAddress.mutate()}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
    fontWeight: "bold",
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

export default AddressItem;
