import { StyleSheet } from "react-native";

import { theme } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
  },
  contentContainer: {
    height: 65,
    flexDirection: "row",
  },
  textContainer: {
    alignItems: "flex-start",
    justifyContent: "center",
    // backgroundColor: "#8a75f4",
  },
  addressText: {
    color: theme.colors.secondary,
  },
});
