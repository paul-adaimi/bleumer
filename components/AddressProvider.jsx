import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, useMutation } from "react-query";
import { useUser } from "@clerk/clerk-expo";
import fetchUserAddresses from "@/queries/fetchUserAddresses";
import * as Location from "expo-location";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import { useQueryClient } from "react-query";
import deleteUserAddress from "@/queries/deleteUserAddress";

// Create a context for the address
const AddressContext = createContext();

// TODO: Handle empty address

// Create a provider component
export const AddressProvider = ({ children }) => {
  const [isForceLoading, setIsForceLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [currentAddress, setCurrentAddress] = useState({});

  const queryClient = useQueryClient();
  const { user } = useUser();

  const {
    data: addresses,
    error,
    isFetching,
    isLoading,
  } = useQuery("addresses", async () => fetchUserAddresses(user.id));

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
    await AsyncStorage.setItem("address", JSON.stringify(closestAddress));
    setIsLocationLoading(false);
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
      } finally {
        setHasLoaded(true);
      }
    };

    if (!isLoading && !hasLoaded) {
      loadAddressData();
    }
  }, [getLocation]);

  const createAddress = useCallback(
    async (addressValues) => {
      const userRef = doc(db, "Users", user.id);

      await updateDoc(userRef, {
        addresses: arrayUnion(addressValues),
      });

      await queryClient.invalidateQueries("addresses");
      const updatedAddresses = queryClient.getQueryData("addresses");

      const newCurrentAddress = updatedAddresses.find(
        (address) => address.id === addressValues.id
      );

      if (newCurrentAddress) {
        setCurrentAddress(newCurrentAddress);
      }
    },
    [user.id, db]
  );

  const deleteAddress = useMutation({
    mutationFn: async (index) => {
      setIsForceLoading(true);
      await deleteUserAddress(user.id, index);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("addresses");
    },
    onSettled: () => {
      setIsForceLoading(false);
    },
  });

  // TODO: if deleted address is current, getLocation again
  // TODO: Handle delete is ugly

  return (
    <AddressContext.Provider
      value={{
        addresses,
        currentAddress,
        setCurrentAddress,
        createAddress,
        deleteAddress,
        isFetching: isLocationLoading || isFetching || isForceLoading,
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
