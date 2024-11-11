import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import * as Location from "expo-location";
import firestore from "@react-native-firebase/firestore";
import { useAuth } from "@/components/AuthProvider";
import useUserAddresses from "@/hooks/useUserAddresses";
import { useSnackbar } from "@/components/SnackbarProvider";
import * as Sentry from "@sentry/react-native";

// Create a context for the address
const AddressContext = createContext();

// Create a provider component
export const AddressProvider = ({ children }) => {
  const { setSnackbarData } = useSnackbar();
  const [isForceLoading, setIsForceLoading] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(false);

  const { currentUser } = useAuth();

  const { addresses, error, isLoading, currentAddress, setCurrentAddress } =
    useUserAddresses(currentUser.uid);

  const getLocation = useCallback(async () => {
    setIsLocationLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setCurrentAddress(addresses?.[0]);
      setIsLocationLoading(false);
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    const closestAddress = findClosestAddress(addresses ?? [], {
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    });
    setCurrentAddress(closestAddress);
    setIsLocationLoading(false);
  }, [addresses]);

  useEffect(() => {
    const loadAddressData = async () => {
      try {
        await getLocation();
      } catch (error) {
        Sentry.captureException(error);
        setSnackbarData({
          message: "Failed to load address data",
          backgroundColor: "red",
        });
      }
    };

    if (!currentAddress) {
      loadAddressData();
    }
  }, [getLocation, currentAddress]);

  const createAddress = useCallback(async (addressValues) => {
    setIsForceLoading(true);
    const addressesRef = firestore().collection(
      `Users/${currentUser.uid}/addresses`
    );
    await addressesRef.add(addressValues);
    setIsForceLoading(false);
  }, []);

  const editAddress = useCallback(async (addressValues) => {
    setIsForceLoading(true);
    const addressesRef = firestore().collection(
      `Users/${currentUser.uid}/addresses`
    );
    // this is the addressValues without id field
    newAddressValues = { ...addressValues };
    delete newAddressValues.id;
    await addressesRef.doc(addressValues.id).update(newAddressValues);
    setIsForceLoading(false);
  }, []);

  const deleteAddress = useCallback(
    async (address) => {
      setIsForceLoading(true);
      const addressesRef = firestore().collection(
        `Users/${currentUser.uid}/addresses`
      );
      await addressesRef.doc(address.id).delete();
      if (currentAddress.id === address.id) {
        setCurrentAddress(null);
      }
      setIsForceLoading(false);
    },
    [currentAddress]
  );

  return (
    <AddressContext.Provider
      value={{
        addresses,
        currentAddress,
        setCurrentAddress,
        createAddress,
        editAddress,
        deleteAddress,
        isFetching: isLocationLoading || isLoading || isForceLoading,
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
