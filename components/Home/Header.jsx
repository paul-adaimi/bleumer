import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useMemo, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "@/components/CartProvider";
import { useNavigation } from "expo-router";
import { useAddress } from "@/components/AddressProvider";
import BottomModalDrawer from "@/components/Modals/BottomModalDrawer";
import AddressesModal from "@/components/Modals/Addresses";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { Tip, showTip, closeTip } from "react-native-tip";
import { useTour } from "@/components/TourProvider";

export default function Header({
  searchText,
  setSearchText,
  title,
  isLoading,
  id,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { isInTour, setIsInTour } = useTour();

  const { totalItemCount } = useCart();
  const navigation = useNavigation();
  const { currentAddress, isFetching: isAddressLoading } = useAddress();

  const totalCountFinal = useMemo(
    () => (totalItemCount > 99 ? "99+" : totalItemCount),
    [totalItemCount]
  );

  const countBadgeRight = useMemo(() => {
    if (totalItemCount < 10) return -10;
    else if (totalItemCount < 100) return -15;
    else return -28;
  }, [totalItemCount]);

  const isCartDisabled = useMemo(
    () => !totalItemCount || !currentAddress || isAddressLoading,
    [totalItemCount, currentAddress, isAddressLoading]
  );

  const cartTipBody = useMemo(() => {
    if (isInTour) return "Tap here to view the items in your cart.";
    else if (isAddressLoading) return "Please wait for address to be loaded";
    else if (!currentAddress) return "Add an Address before accessing cart";
    else return "Add items to cart before accessing cart";
  }, [isInTour, isAddressLoading, currentAddress]);

  return (
    <View
      style={{
        padding: 20,
        paddingTop: 40,
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        opacity: 1,
      }}
    >
      <BottomModalDrawer
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Choose an Address"
      >
        <AddressesModal onClose={() => setIsModalVisible(false)} />
      </BottomModalDrawer>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        {isAddressLoading && (
          <View>
            <SkeletonPlaceholder borderRadius={4}>
              <SkeletonPlaceholder.Item width={100} height={30} />
            </SkeletonPlaceholder>
          </View>
        )}
        {!isAddressLoading && (
          <Tip
            id="address"
            title="Add Address"
            body="Tap here to add or update your address."
            showItemPulseAnimation
            pulseColor={Colors.primary}
            dismissable={false}
            onPressItem={() => {}}
            active={false}
          >
            <TouchableOpacity
              onPress={() => setIsModalVisible(true)}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
              disabled={isInTour}
            >
              <Ionicons
                style={{
                  borderColor: Colors.white,
                }}
                name="location-sharp"
                size={24}
                color={Colors.white}
              />
              <Text
                style={{
                  color: "#FFF",
                  fontSize: 17,
                }}
              >
                {currentAddress ? currentAddress.name : "No address found!"}
              </Text>
            </TouchableOpacity>
          </Tip>
        )}
        {isLoading && (
          <SkeletonPlaceholder borderRadius={4}>
            <SkeletonPlaceholder.Item width={40} height={40} />
          </SkeletonPlaceholder>
        )}
        {!isLoading && (
          <Tip
            id={`cart-${id}`}
            title="Cart"
            body={cartTipBody}
            showItemPulseAnimation
            pulseColor={Colors.primary}
            dismissable={true}
            onDismiss={() => {
              setIsInTour(false);
              closeTip();
            }}
            onPressItem={() => {}}
          >
            <TouchableOpacity
              disabled={isInTour}
              style={{
                marginRight: 10,
                display: "flex",
                justifyContent: "center",
                backgroundColor: isCartDisabled
                  ? Colors.primaryShade
                  : Colors.primary,
                paddingHorizontal: 5,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: Colors.white,
                height: 40,
              }}
              onPress={() => {
                if (!isCartDisabled)
                  navigation.navigate("cart", {
                    from: title ? title : "Home",
                  });
                else showTip(`cart-${id}`);
              }}
            >
              <View
                style={{
                  backgroundColor: Colors.gray,
                  position: "absolute",
                  paddingHorizontal: 3,
                  paddingVertical: 2,
                  right: countBadgeRight,
                  borderRadius: 10,
                  zIndex: 100,
                  minWidth: totalItemCount > 99 ? 34 : "auto",
                }}
              >
                <Text
                  numberOfLines={1}
                  style={{
                    overflow: "hidden",
                    color: Colors.white,
                  }}
                >
                  {totalCountFinal}
                </Text>
              </View>
              <Ionicons name="cart-outline" size={24} color={Colors.white} />
            </TouchableOpacity>
          </Tip>
        )}
      </View>
      {isLoading && (
        <View
          style={{
            marginTop: 15,
            marginVertical: 10,
          }}
        >
          <SkeletonPlaceholder borderRadius={4}>
            <SkeletonPlaceholder.Item width={"100%"} height={40} />
          </SkeletonPlaceholder>
        </View>
      )}
      {setSearchText && !isLoading && (
        <Tip
          id="search"
          title="Search"
          body="Find your favorite items by searching here."
          showItemPulseAnimation
          pulseColor={Colors.primary}
          dismissable={false}
          active={false}
          onPressItem={() => {}}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              backgroundColor: "#FFF",
              padding: 10,
              marginVertical: 10,
              marginTop: 15,
              borderRadius: 8,
            }}
          >
            <Ionicons name="search" size={24} color={Colors.primary} />
            <TextInput
              editable={!isInTour}
              value={searchText || ""}
              onChangeText={(value) => setSearchText(value)}
              style={{
                fontSize: 16,
                flex: 1,
              }}
              placeholder="Search..."
              placeholderTextColor={Colors.lightGray}
            />
          </View>
        </Tip>
      )}
      {title && !isLoading && (
        <View
          style={{
            marginTop: 15,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back" size={24} color={Colors.white} />
            <Text
              style={{ fontSize: 16, fontWeight: "600", color: Colors.white }}
            >
              Home
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 16,
              color: Colors.white,
              position: "absolute", // Absolutely position the text
              left: "50%", // Move to 50% of the width
              transform: [{ translateX: -20 }], // Center it based on screen width
            }}
          >
            {title}
          </Text>
        </View>
      )}
    </View>
  );
}
