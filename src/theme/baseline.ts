import { StyleSheet, Dimensions } from "react-native";

import { theme } from "./theme";

export const WIDTH = Dimensions.get("screen").width * 0.9;

export const baseline = StyleSheet.create({
  baseContainer: {
    flex: 1,
    alignSelf: "center",
    width: WIDTH,
    marginTop: 24,
    marginBottom: 24,
  },
  baseContainerNoMarginY: {
    flex: 1,
    alignSelf: "center",
    width: WIDTH,
  },
  marginRegularVertical: {
    marginVertical: 12,
  },
  marginExtendedVertical: {
    marginVertical: 24,
  },
  marginRegularTop: {
    marginTop: 12,
  },
  marginRegularBottom: {
    marginBottom: 12,
  },
  marginExtendedTop: {
    marginTop: 24,
  },
  marginExtendedBottom: {
    marginBottom: 24,
  },
  checkboxListContainer: {
    paddingVertical: 12,
    borderRadius: theme.roundness,
  },
  checkboxItemContainer: {
    paddingHorizontal: 12,
  },
  checkboxDividerLeft: {
    marginVertical: 12,
    marginLeft: 48,
  },
  checkboxDividerRight: {
    marginVertical: 12,
    marginRight: 48,
  },
});
