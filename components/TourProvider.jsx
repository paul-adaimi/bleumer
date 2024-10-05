import React, { createContext, useState, useContext } from "react";

// Create the context
const TourContext = createContext();

// Create the provider component
export default TourProvider = ({ children }) => {
  const [isInTour, setIsInTour] = useState(false);

  return (
    <TourContext.Provider value={{ isInTour, setIsInTour }}>
      {children}
    </TourContext.Provider>
  );
};

// Custom hook to use the TourContext
export const useTour = () => {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error("useTour must be used within a TourProvider");
  }
  return context;
};
