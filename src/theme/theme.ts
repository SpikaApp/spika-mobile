import { MD3LightTheme, adaptNavigationTheme } from "react-native-paper";
import { DefaultTheme } from "@react-navigation/native";

const defaultTheme = MD3LightTheme;

export const theme = {
  ...defaultTheme,
  roundness: 12,
  colors: {
    ...defaultTheme.colors,
    trend: {
      green: "#00ff11",
      red: "#ff2200",
      neutral: defaultTheme.colors.onBackground,
    },
  },
};

export const { LightTheme } = adaptNavigationTheme({ reactNavigationLight: DefaultTheme });
