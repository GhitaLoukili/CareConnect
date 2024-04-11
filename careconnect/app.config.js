import "dotenv/config";

export default {
  expo: {
    name: "careconnect",
    slug: "CareConnect",
    platforms: ["ios", "android", "web"],
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icons/app-icon-main.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash-screen.png",
      resizeMode: "cover",
      backgroundColor: "#B272A4",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/icons/app-icon-main.png",
        backgroundColor: "#B272A4",
      },
    },
    web: {
      favicon: "./assets/icons/app-icon-main.png",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    plugins: [
      [
        "expo-font",
        {
          fonts: [
            "./assets/fonts/FiraSans-Medium.ttf",
            "./assets/fonts/FiraSans-MediumItalic.ttf",
            "./assets/fonts/FiraSans-Regular.ttf",
            "./assets/fonts/FiraSans-SemiBold.ttf",
            "./assets/fonts/FiraSans-SemiBoldItalic.ttf",
            "./assets/fonts/FiraSans-Thin.ttf",
            "./assets/fonts/FiraSans-ThinItalic.ttf",
          ],
        },
      ],
    ],
    extra: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.FIREBASE_APP_ID,
    },
  },
};