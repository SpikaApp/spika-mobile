import { StyleSheet } from "react-native";

import { theme } from "../../../theme";

export const styles = StyleSheet.create({
  infoContainer: {
    padding: 12,
    borderRadius: theme.roundness,
  },
  passwordContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: 175,
  },
  passwordField: {
    width: "75%",
  },
  helperTextContainer: {
    height: 30,
  },
  buttonContainer: {
    alignSelf: "center",
    width: "75%",
  },
});
