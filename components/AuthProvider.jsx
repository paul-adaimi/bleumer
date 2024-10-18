import React, { createContext, useState, useContext } from "react";

// Create the context
const AuthContext = createContext();

// Create the provider component
export default AuthProvider = ({ children }) => {
  const [confirmation, setConfirmation] = useState(null);

  return (
    <AuthContext.Provider value={{ confirmation, setConfirmation }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
