import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useMemo, useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../CartProvider";
import { useNavigation } from "expo-router";
import { useAddress } from "../AddressProvider";
import ModalScreen from "../ModalScreen";
import AddressesModal from "../Modals/Addresses";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { CopilotStep, walkthroughable } from "react-native-copilot";
import { Tip, showTip, closeTip } from "react-native-tip";

// TODO: Change copilot steps and texts

const CopilotTouchableOpacity = walkthroughable(TouchableOpacity);
const CopilotView = walkthroughable(View);

export default function Header({
  searchText,
  setSearchText,
  title,
  isLoading,
}) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { totalItemCount } = useCart();
  const navigation = useNavigation();
  const { currentAddress, isFetching: isAddressLoading } = useAddress();

  const totalCountFinal = useMemo(
    () => (totalItemCount > 99 ? "99+" : totalItemCount),
    [totalItemCount]
  );

  const countBadgeRight = useMemo(() => {
    if (totalItemCount < 9) return -10;
    else if (totalItemCount < 100) return -15;
    else return -25;
  }, [totalItemCount]);

  return (
    <View
      style={{
        padding: 20,
        paddingTop: 40,
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
      <ModalScreen
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Choose an Address"
      >
        <AddressesModal onClose={() => setIsModalVisible(false)} />
      </ModalScreen>
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
          <CopilotStep
            text="Click here to add or change an address"
            order={1}
            name="hello"
          >
            <CopilotTouchableOpacity
              onPress={() => setIsModalVisible(true)}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
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
            </CopilotTouchableOpacity>
          </CopilotStep>
        )}
        {isLoading && (
          <SkeletonPlaceholder borderRadius={4}>
            <SkeletonPlaceholder.Item width={40} height={40} />
          </SkeletonPlaceholder>
        )}
        {!isLoading && (
          <CopilotStep
            text="Click here to check your cart"
            order={2}
            name="cart"
          >
            <Tip
              id="heart"
              title="Add Address"
              body="Please add an address before checking your cart"
              showItemPulseAnimation
              pulseColor={Colors.primary}
              active={true}
            >
              <CopilotTouchableOpacity
                style={{
                  marginRight: 10,
                  display: "flex",
                  justifyContent: "center",
                  backgroundColor:
                    totalItemCount && currentAddress
                      ? Colors.primary
                      : Colors.primaryShade,
                  paddingHorizontal: 5,
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: Colors.white,
                  height: 40,
                }}
                onPress={() => {
                  if (totalItemCount && currentAddress)
                    navigation.navigate("cart");
                  else showTip("heart");
                }}
              >
                <View
                  style={{
                    backgroundColor: Colors.gray,
                    position: "absolute",
                    paddingHorizontal: 4,
                    paddingVertical: 2,
                    right: countBadgeRight,
                    borderRadius: 10,
                    zIndex: 100,
                  }}
                >
                  <Text style={{ color: Colors.white }}>{totalCountFinal}</Text>
                </View>
                <Ionicons name="cart-outline" size={24} color={Colors.white} />
              </CopilotTouchableOpacity>
            </Tip>
          </CopilotStep>
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
        <CopilotStep
          text="Search for your favorite items!"
          order={3}
          name="search"
        >
          <CopilotView
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
              value={searchText || ""}
              onChangeText={(value) => setSearchText(value)}
              style={{
                fontSize: 16,
              }}
              placeholder="Search..."
            />
          </CopilotView>
        </CopilotStep>
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
          <Tip title="Title" body="body" active={true}>
            <Text
              style={{
                fontWeight: "700",
                fontSize: 16,
                color: Colors.white,
                position: "absolute", // Absolutely position the text
                left: "50%", // Move to 50% of the width
                transform: [{ translateX: -45 }], // Center it based on screen width
              }}
            >
              {title}
            </Text>
          </Tip>
        </View>
      )}
    </View>
  );
}
