import React, { useEffect, useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

const LoadingButton = ({
  onPress,
  isLoading,
  text,
  disabled,
  style,
  children,
}) => {
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
      style={[styles.buttonContainer, style]}
      disabled={isLoading || disabled}
    >
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: style?.borderRadius ?? 5,
          overflow: "hidden",
          backgroundColor:
            isLoading || disabled ? Colors.primaryShade : Colors.primary,
        }}
      >
        <View style={[styles.loadingFill, { width: `${progress}%` }]} />
      </View>
      {children ? (
        children
      ) : (
        <Text
          style={{
            textAlign: "center",
            color: "#FFF",
            fontWeight: "bold",
          }}
        >
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    // Shadow for iOS
    shadowColor: Colors.black,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    // Shadow for Android
    elevation: 5,
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
