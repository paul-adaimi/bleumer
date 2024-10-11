import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { Colors } from "../constants/Colors";

const LoadingButton = ({ onPress, isLoading, children }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (isLoading) {
      // Start an interval to simulate the loading progress
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 97) {
            return 97; // Cap it at a value close to 100, never reaching 100
          }

          // Reduce the step size as we get closer to 100, creating a never-ending approach
          const step = (100 - prevProgress) * 0.004; // Smaller steps as progress gets closer to 100
          return prevProgress + step;
        });
      }, 10); // Adjust interval duration if needed
    } else {
      setProgress(0); // Reset progress when not loading
    }

    return () => {
      // Clean up interval on component unmount or when loading stops
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isLoading]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.buttonContainer}
      disabled={isLoading} // Disable button while loading
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 5,
          overflow: "hidden",
          backgroundColor: isLoading ? Colors.primaryShade : Colors.primary,
        }}
      >
        <View style={[styles.loadingFill, { width: `${progress}%` }]} />
      </View>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 15,
    borderRadius: 5,
    overflow: "hidden",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    marginBottom: 15,
  },
  buttonBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: Colors.primary,
  },
  loadingFill: {
    position: "absolute",
    height: "100%",
    backgroundColor: Colors.primaryLight,
    opacity: 0.5,
  },
  buttonText: {
    textAlign: "center",
    color: "#FFF",
    fontWeight: "bold",
    zIndex: 1, // Ensures text is above the loading fill
  },
});

export default LoadingButton;
