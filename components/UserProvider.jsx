import React, { createContext, useContext, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import fetchUser from "../queries/fetchUser";
import firestore from "@react-native-firebase/firestore";
import { useAuth } from "@/components/AuthProvider";

// Create a context for user-related data
const UserContext = createContext();

// Create the UserProvider component
export const UserProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const { currentUser } = useAuth();

  const {
    data: userData,
    error,
    isFetching,
  } = useQuery("userData", async () => fetchUser(currentUser.uid));

  // Fetch promo codes for the user
  const promoCodes = useMemo(() => {
    return userData?.promoCodes || [];
  }, [userData]);

  const deletePromoCode = useMutation({
    mutationFn: async (code) => {
      const userRef = firestore().collection("Users").doc(currentUser.uid);

      // Filter the promoCodes array to remove the promo code that matches the code
      const updatedPromoCodes = promoCodes.filter(
        (promo) => promo.code !== code
      );

      // Update the Firestore document with the new array of promo codes
      await userRef.update({
        promoCodes: updatedPromoCodes,
      });
    },
    onSuccess: async () => {
      // Invalidate the query to refetch updated user data
      queryClient.invalidateQueries("userData");
    },
    onError: (error) => {
      console.error("Error deleting promo code:", error);
    },
  });

  return (
    <UserContext.Provider
      value={{
        userData,
        promoCodes,
        deletePromoCode: deletePromoCode.mutateAsync,
        isLoading: deletePromoCode.isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
  return useContext(UserContext);
};
