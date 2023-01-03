import type { ExpoConfig, ConfigContext } from "expo/config";

import { name, version, description } from "./package.json";

// eslint-disable-next-line import/no-anonymous-default-export, import/no-default-export
export default ({ config }: ConfigContext): ExpoConfig => {
  return {
    ...config,
    name: "Spika",
    slug: name,
    version: version,
    description: description,
    owner: "xorgal",
    orientation: "portrait",
    icon: "./src/assets/images/icon.png",
    userInterfaceStyle: "light",
    jsEngine: "hermes",
    splash: {
      image: "./src/assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      jsEngine: "hermes",
      supportsTablet: true,
      bundleIdentifier: "app.spika.mobile",
    },
    android: {
      jsEngine: "hermes",
      adaptiveIcon: {
        foregroundImage: "./src/assets/images/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
    },
    web: {
      favicon: "./src/assets/images/favicon.png",
    },
    extra: {
      eas: {
        projectId: "ae587d17-6991-44fd-aaa2-efa9bdffe3bd",
      },
      nodeUrl: process.env.NODE_URL,
      testAddress: process.env.TEST_ADDRESS,
    },
  };
};
