import React, { createContext, useState, useContext } from "react";
import { Text } from "react-native";
import { Snackbar, Portal } from "react-native-paper";

// Create the context
const SnackbarContext = createContext();

// Create the provider component
export default SnackbarProvider = ({ children }) => {
  const [snackbarData, setSnackbarData] = useState(null);
  const isSnackbarVisible = snackbarData !== null;
  return (
    <SnackbarContext.Provider value={{ setSnackbarData }}>
      {children}
      <Portal>
        {isSnackbarVisible && (
          <Snackbar
            style={{
              backgroundColor: snackbarData?.backgroundColor ?? "red",
            }}
            visible={isSnackbarVisible}
            onDismiss={() => setSnackbarData(null)}
            onIconPress={() => setSnackbarData(null)}
          >
            <Text
              style={{
                color: "#FFF",
              }}
            >
              {snackbarData?.message}
            </Text>
          </Snackbar>
        )}
      </Portal>
    </SnackbarContext.Provider>
  );
};

// Custom hook to use the SnackbarContext
export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
