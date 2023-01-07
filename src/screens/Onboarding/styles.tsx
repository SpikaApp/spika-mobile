import { StyleSheet } from "react-native";

import { theme } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 0.5,
    justifyContent: "space-around",
    alignItems: "center",
    // borderWidth: 2,
    // borderColor: "#ffffff",
  },
  welcomeTextWrapper: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 60,
    // borderWidth: 1,
    // borderColor: "#ffffff",
  },
  textAreaWrapper: {
    textAlign: "center",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    // marginTop: 12,
    // borderWidth: 2,
    // borderColor: "#ffffff",
  },
  buttons: {
    width: 225,
    height: 115,
    marginTop: 24,
    // borderWidth: 1,
    // borderColor: "#ffffff",
  },
  helperWrapper: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "column",
    // borderWidth: 2,
    // borderColor: "#ffffff",
  },
  helpTextWrapper: {
    textAlign: "center",
    marginTop: 50,
  },
  textLayout: {
    textAlign: "center",
  },
  background: {
    height: 211,
    width: 317,
    // borderWidth: 2,
    // borderColor: "#ffffff",
  },
  link: {
    color: theme.colors.primary,
  },
});
