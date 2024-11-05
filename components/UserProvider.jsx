import React, { createContext, useContext, useMemo } from "react";
import { useQuery } from "react-query";
import fetchUser from "@/queries/fetchUser";
import { useAuth } from "@/components/AuthProvider";

// Create a context for user-related data
const UserContext = createContext();

// Create the UserProvider component
export const UserProvider = ({ children }) => {
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

  return (
    <UserContext.Provider
      value={{
        userData,
        promoCodes,
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
