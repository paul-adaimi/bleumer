import { View, Text, TouchableOpacity, Animated } from "react-native";
import React, { useEffect, useCallback, useState } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "@/constants/Colors";
import CheckoutCard from "../components/Cart/CheckoutCard";
import CustomTextInput from "../components/CustomTextInput";
import { useCart } from "../components/CartProvider";
import { useUser } from "@clerk/clerk-expo";
import { useQueryClient, useMutation } from "react-query";
import createOrder from "@/queries/createOrder";
import { useAddress } from "../components/AddressProvider";
import ModalScreen from "../components/ModalScreen";
import AddressesModal from "../components/Modals/Addresses";
import LoadingButton from "../components/LoadingButton";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

// TODO: Add status to order, default it to "pending" (will be used in the future)
export default function Checkout() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const navigation = useNavigation();
  const { cart, subTotal, emptyCart } = useCart();
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { currentAddress, isFetching: isAddressLoading } = useAddress();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Checkout",
      headerBackTitle: "My Cart",
    });
  }, []);

  const { isLoading, mutate } = useMutation(
    () => createOrder(user.id, { cart, total: subTotal }, currentAddress),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("orders");
        emptyCart();
        navigation.navigate("orders");
      },
    }
  );

  return (
    <View
      style={{
        padding: 5,
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <ModalScreen
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Choose an Address"
      >
        <AddressesModal
          backTitle="Checkout"
          onClose={() => setIsModalVisible(false)}
        />
      </ModalScreen>
      <View>
        <CheckoutCard title="Delivery Address">
          {isAddressLoading ? (
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item width={"100%"} height={10} />
              <SkeletonPlaceholder.Item
                marginTop={2}
                width={"100%"}
                height={10}
              />
              <SkeletonPlaceholder.Item
                marginTop={2}
                width={"100%"}
                height={10}
              />
              <SkeletonPlaceholder.Item
                marginTop={2}
                width={"100%"}
                height={10}
              />
            </SkeletonPlaceholder>
          ) : (
            <>
              <Text>{currentAddress.name}</Text>
              <Text>{currentAddress.city.name}</Text>
              <Text>{currentAddress.street}</Text>
              <Text>{currentAddress.number}</Text>
            </>
          )}

          <TouchableOpacity
            disabled={isAddressLoading}
            onPress={() => setIsModalVisible(true)}
            style={{
              backgroundColor: isAddressLoading
                ? Colors.primaryShade
                : Colors.primary,
              marginTop: 10,
              height: 25,
              borderRadius: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: Colors.white }}>Change</Text>
          </TouchableOpacity>
        </CheckoutCard>
        <CheckoutCard title="Delivery Day">
          <Text>Monday September 2, 2024</Text>
        </CheckoutCard>
        <CheckoutCard title="Payment Method">
          <Text> Only cash available at the moment</Text>
        </CheckoutCard>
        <CheckoutCard title="Promo Code">
          <CustomTextInput />
        </CheckoutCard>
        <CheckoutCard>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>Subtotal</Text>
            <Text>$ {subTotal}</Text>
          </View>
          <View
            style={{
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>Delivery Charge</Text>
            <Text>$ 0</Text>
          </View>
          <View
            style={{
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text>Discount</Text>
            <Text>- $ 0</Text>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: Colors.gray,
              borderStyle: "dashed",
              marginTop: 10,
            }}
          />
          <View
            style={{
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>Total</Text>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              $ {subTotal}
            </Text>
          </View>
        </CheckoutCard>
      </View>
      <View
        style={{
          padding: 15,
        }}
      >
        {/* TODO: Add disabled when address loading */}
        <LoadingButton onPress={mutate} isLoading={isLoading}>
          <Text
            style={{
              textAlign: "center",
              color: "#FFF",
              fontWeight: "bold",
            }}
          >
            Place Order
          </Text>
        </LoadingButton>
      </View>
    </View>
  );
}
