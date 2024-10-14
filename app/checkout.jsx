import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useCallback, useState, useMemo } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "@/constants/Colors";
import CheckoutCard from "../components/Cart/CheckoutCard";
import CustomTextInput from "../components/CustomTextInput";
import { useCart } from "../components/CartProvider";
import { useUser } from "@clerk/clerk-expo";
import { useQueryClient, useMutation } from "react-query";
import createOrder from "@/queries/createOrder";
import { useAddress } from "../components/AddressProvider";
import BottomModalDrawer from "../components/Modals/BottomModalDrawer";
import AddressesModal from "../components/Modals/Addresses";
import LoadingButton from "../components/LoadingButton";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { useUserContext } from "../components/UserProvider";

export default function Checkout() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [isPromoInvalid, setIsPromoInvalid] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState(0);

  const navigation = useNavigation();
  const { cart, subTotal, emptyCart } = useCart();
  const { user } = useUser();
  const queryClient = useQueryClient();
  const { currentAddress, isFetching: isAddressLoading } = useAddress();

  const { promoCodes, deletePromoCode } = useUserContext();

  const totalPrice = useMemo(
    () => subTotal - discountedPrice,
    [subTotal, discountedPrice]
  );

  const checkAndApplyPromoCode = useCallback(
    (appliedCode) => {
      const code = promoCodes.find((promo) => promo.code === appliedCode);
      if (code) {
        setDiscountedPrice((code.discount / 100) * subTotal);
        setIsPromoApplied(true);
      } else {
        setIsPromoInvalid(true);
      }
    },
    [promoCodes, subTotal]
  );

  const onChangePromo = (text) => {
    setPromoCode(text);
    setIsPromoApplied(false);
    setIsPromoInvalid(false);
    setDiscountedPrice(0);
  };

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Checkout",
      headerBackTitle: "My Cart",
    });
  }, []);

  // apply the first promo code directly
  useEffect(() => {
    if (promoCodes.length > 0) {
      onChangePromo(promoCodes[0].code);
      checkAndApplyPromoCode(promoCodes[0].code);
    }
  }, [promoCodes]);

  const expectedDeliveryTime = addBusinessDays(
    new Date(),
    currentAddress.city.businessDays
  );

  const { isLoading, mutate } = useMutation(
    () =>
      createOrder(user.id, {
        cart,
        orderTime: new Date().toISOString(),
        expectedDeliveryTime: expectedDeliveryTime.toISOString(),
        address: currentAddress,
        promoCode: promoCode,
        subTotal: subTotal,
        total: totalPrice,
        status: "pending",
      }),
    {
      onSuccess: () => {
        deletePromoCode(promoCode);
        queryClient.invalidateQueries("orders");
        emptyCart();
        navigation.navigate("orders");
      },
    }
  );

  return (
    <>
      <ScrollView
        style={{
          padding: 5,
        }}
      >
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
                marginTop: 20,
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
          <CheckoutCard title="Expected Delivery Day">
            <Text>{formatDate(expectedDeliveryTime)}</Text>
          </CheckoutCard>
          <CheckoutCard title="Payment Method">
            <Text> Only cash on delivery available at the moment.</Text>
          </CheckoutCard>
          <CheckoutCard title="Promo Code">
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              <CustomTextInput
                placeholder="Promo Code"
                value={promoCode}
                onChangeText={(text) => onChangePromo(text)}
                containerStyle={{ flex: 1 }}
              />
              <TouchableOpacity
                disabled={isPromoApplied}
                onPress={() => checkAndApplyPromoCode(promoCode)}
                style={{
                  backgroundColor: isPromoApplied
                    ? Colors.primaryShade
                    : Colors.primary,
                  height: 53,
                  marginLeft: 5,
                  padding: 10,
                  borderRadius: 5,
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: Colors.white }}>Apply</Text>
              </TouchableOpacity>
            </View>
            {isPromoInvalid && (
              <Text style={{ color: "red", marginTop: 5 }}>
                {" "}
                This promocode is invalid!
              </Text>
            )}
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
            {!!discountedPrice && (
              <View
                style={{
                  marginTop: 10,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>{promoCode}</Text>
                <Text>- $ {discountedPrice}</Text>
              </View>
            )}
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
                $ {totalPrice}
              </Text>
            </View>
          </CheckoutCard>
        </View>
        <View
          style={{
            padding: 15,
          }}
        >
          <LoadingButton
            onPress={mutate}
            isLoading={isLoading}
            disabled={isAddressLoading}
          >
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
      </ScrollView>
      <BottomModalDrawer
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Choose an Address"
      >
        <AddressesModal
          backTitle="Checkout"
          onClose={() => setIsModalVisible(false)}
        />
      </BottomModalDrawer>
    </>
  );
}

function addBusinessDays(date, days) {
  let currentDate = new Date(date);
  let addedDays = 0;

  while (addedDays < days) {
    currentDate.setDate(currentDate.getDate() + 1);

    // Get the current day of the week (0 = Sunday, 6 = Saturday)
    const dayOfWeek = currentDate.getDay();

    // Only count the day if it's a weekday (Monday to Friday)
    if (dayOfWeek !== 0) {
      addedDays++;
    }
  }

  return currentDate;
}

function formatDate(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
}
