import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "react-query";
import { useUser } from "@clerk/clerk-expo";
import fetchUserAddresses from "@/app/queries/fetchUserAddresses";
import * as Location from "expo-location";

// Create a context for the address
const AddressContext = createContext();

// Create a provider component
export const AddressProvider = ({ children }) => {
  const [currentAddress, setCurrentAddress] = useState({});
  const { user } = useUser();

  const {
    data: addresses,
    error,
    isFetching,
  } = useQuery("addresses", async () => fetchUserAddresses(user.id));

  const getLocation = useCallback(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setCurrentAddress(addresses?.[0]);
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log(location);
    const closestAddress = findClosestAddress(addresses ?? [], {
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    });
    setCurrentAddress(closestAddress);
    await AsyncStorage.setItem("address", JSON.stringify(closestAddress));
  }, [addresses]);

  // Load address data from AsyncStorage when the app starts
  useEffect(() => {
    const loadAddressData = async () => {
      try {
        const savedAddress = await AsyncStorage.getItem("address");
        if (savedAddress) {
          setCurrentAddress(JSON.parse(savedAddress));
        }
        await getLocation();
      } catch (error) {
        console.error("Failed to load address data:", error);
      }
    };

    loadAddressData();
  }, [getLocation]);

  return (
    <AddressContext.Provider
      value={{
        currentAddress,
        setCurrentAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

// Custom hook to use the AddressContext
export const useAddress = () => {
  return useContext(AddressContext);
};

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function findClosestAddress(addresses, location) {
  if (addresses.length === 0) return null;

  let closestAddress = addresses[0];
  let smallestDistance = getDistanceFromLatLonInKm(
    location.latitude,
    location.longitude,
    addresses[0].coordinates.latitude,
    addresses[0].coordinates.longitude
  );

  for (let i = 1; i < addresses.length; i++) {
    const address = addresses[i];
    const distance = getDistanceFromLatLonInKm(
      location.latitude,
      location.longitude,
      address.coordinates.latitude,
      address.coordinates.longitude
    );

    if (distance < smallestDistance) {
      smallestDistance = distance;
      closestAddress = address;
    }
  }

  return closestAddress;
}
