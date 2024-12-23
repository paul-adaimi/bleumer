import React from "react";
import { Slot } from "expo-router";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider as PaperProvider } from "react-native-paper";
import TipProvider from "react-native-tip";
import AuthProvider from "@/components/AuthProvider";
import ErrorBoundary from "@/components/ErrorBoundary";
import SnackbarProvider from "@/components/SnackbarProvider";
import * as Sentry from "@sentry/react-native";

Sentry.init({
  dsn: "https://ae163507f254b1908acad4edb47f4f61@o4508269603979264.ingest.de.sentry.io/4508269606994000",
  debug: true,
});

const queryClient = new QueryClient();

function RootLayout() {
  return (
    <ErrorBoundary>
      <PaperProvider>
        <SnackbarProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <Slot />
            </AuthProvider>
            <TipProvider
              overlayOpacity={0.9}
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

export default Sentry.wrap(RootLayout);
