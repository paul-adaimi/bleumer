import React from "react";
import { Slot } from "expo-router";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as PaperProvider } from "react-native-paper";
import TipProvider from "react-native-tip";
import TourProvider from "@/components/TourProvider";
import AuthProvider from "@/components/AuthProvider";
import ErrorBoundary from "@/components/ErrorBoundary";
import SnackbarProvider from "@/components/SnackbarProvider";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <ErrorBoundary>
      <PaperProvider>
        <SnackbarProvider>
          <QueryClientProvider client={queryClient}>
            <TourProvider>
              <AuthProvider>
                <Slot />
              </AuthProvider>
            </TourProvider>
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
        </SnackbarProvider>
      </PaperProvider>
    </ErrorBoundary>
  );
}
