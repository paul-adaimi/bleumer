export default {
  expo: {
    name: "Bleumer",
    slug: "bleu-mer",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: false,
      bundleIdentifier: "com.bleu-mer",
      googleServicesFile:
        process.env.GOOGLE_SERVICES_PLIST ?? "./GoogleService-Info.plist",
      infoPlist: {
        CFBundleURLTypes: [
          {
            CFBundleURLSchemes: [
              "app-1-27486714398-ios-8828c4ee25c212aea64c0f",
            ],
          },
        ],
        NSLocationWhenInUseUsageDescription:
          "This app uses your location to determine accurate delivery addresses and improve delivery services.",
        NSPushNotificationUsageDescription:
          "This app uses notifications to send updates about delivery statuses and exclusive offers.",
      },
    },
    android: {
      supportsTablet: false,
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.anonymous.bleumer",
      config: {
        googleMaps: {
          apiKey: "AIzaSyDe-AcRYBbxg5zY08vPXtJ5TAOlKLnBNbw",
        },
      },
      permissions: ["INTERNET", "ACCESS_NETWORK_STATE"],
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      "@react-native-firebase/app",
      "@react-native-firebase/auth",
      [
        "expo-build-properties",
        {
          ios: {
            useFrameworks: "static",
          },
        },
      ],
      [
        "@sentry/react-native/expo",
        {
          organization: "bleumer",
          project: "react-native",
          url: "https://sentry.io/",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      eas: {
        projectId: "a2b45e4d-7e71-4fa6-b49b-1150b91b77c6",
      },
    },
  },
};
