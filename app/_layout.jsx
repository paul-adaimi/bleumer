import React, { useEffect } from "react";
import { Slot } from "expo-router";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Provider as PaperProvider } from "react-native-paper";
import TipProvider from "react-native-tip";
import TourProvider from "@/components/TourProvider";
import AuthProvider from "@/components/AuthProvider";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <TourProvider>
          <AuthProvider>
            <Slot />
          </AuthProvider>
        </TourProvider>
      </PaperProvider>
      <TipProvider
        overlayOpacity={0.8}
        titleStyle={{
          fontWeight: "bold",
          fontSize: 18,
          marginBottom: 10,
        }}
        bodyStyle={{
          fontSize: 16,
        }}
        tipContainerStyle={{
          padding: 20,
          borderRadius: 20,
          maxWidth: 350,
          elevation: 5,
        }}
        prevNextTextStyle={{}}
        prevNextButtonStyle={{}}
      />
    </QueryClientProvider>
  );
}
