import { StyleSheet, Dimensions } from "react-native";

import { theme } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
  },
  wrapper: {
    height: 80,
    flexDirection: "row",
    width: Dimensions.get("screen").width * 0.95,
  },
  asset: {
    flex: 1,
    // backgroundColor: "#f590a3",
    flexDirection: "row",
  },
  iconContainer: {
    flex: 0.16,
    // backgroundColor: "#4ebbbd",
    alignItems: "center",
    justifyContent: "center",
  },
  assetIcon: {
    backgroundColor: theme.colors.secondaryContainer,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  assetInfo: {
    flex: 0.47,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 17,
    // backgroundColor: "#8a75f4",
  },
  marketInfo: {
    flex: 0.404,
    flexDirection: "row",
    // backgroundColor: "#42e621",
  },
  marketValues: {
    flex: 0.8,
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
    // backgroundColor: "#953495",
    paddingRight: 2,
  },
  marketValueSymbol: {
    flex: 0.2,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "#1c7c8d",
  },
});
