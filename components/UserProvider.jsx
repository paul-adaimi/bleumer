import React, { createContext, useContext, useMemo } from "react";
import { useAuth } from "@/components/AuthProvider";
import useUser from "../hooks/useUser";

// Create a context for user-related data
const UserContext = createContext();

// Create the UserProvider component
export const UserProvider = ({ children }) => {
  const { currentUser } = useAuth();

  const { user } = useUser(currentUser.uid);

  // Fetch promo codes for the user
  const promoCodes = useMemo(() => {
    return user?.promoCodes || [];
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
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
