import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "app.anatomica.explorer",
  appName: "Anatomica",
  // The Vite client build (npm run build:client) — models, fonts and the knowledge base
  // are bundled, so the apps work fully offline.
  webDir: "dist/public",
  backgroundColor: "#07090d",
  ios: {
    contentInset: "never",
    backgroundColor: "#07090d",
    scrollEnabled: false,
  },
  android: {
    backgroundColor: "#07090d",
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 600,
      backgroundColor: "#07090d",
      showSpinner: false,
    },
    StatusBar: {
      style: "DARK",
      overlaysWebView: true,
    },
  },
};

export default config;
