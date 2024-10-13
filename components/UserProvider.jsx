import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { useUser } from "@clerk/clerk-expo";
import { doc, getDoc, updateDoc, arrayRemove } from "firebase/firestore";
import { db } from "@/configs/FirebaseConfig";
import { useQuery, useMutation, useQueryClient } from "react-query";
import fetchUser from "../queries/fetchUser";

// Create a context for user-related data
const UserContext = createContext();

// Create the UserProvider component
export const UserProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const {
    data: userData,
    error,
    isFetching,
  } = useQuery("userData", async () => fetchUser(user.id));

  // Fetch promo codes for the user
  const promoCodes = useMemo(() => {
    return userData?.promoCodes || [];
  }, [userData]);

  const deletePromoCode = useMutation({
    mutationFn: async (code) => {
      const userRef = doc(db, "Users", user.id);

      // Filter the promoCodes array to remove the promo code that matches the code
      const updatedPromoCodes = promoCodes.filter(
        (promo) => promo.code !== code
      );

      // Update the Firestore document with the new array of promo codes
      await updateDoc(userRef, {
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
