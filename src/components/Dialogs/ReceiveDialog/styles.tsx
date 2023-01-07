import { StyleSheet } from "react-native";

import { theme } from "../../../theme";

export const styles = StyleSheet.create({
  dialogTitle: {
    alignSelf: "center",
  },
  contentContainer: {
    alignItems: "center",
  },
  qrCodeContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    width: 150,
    height: 150,
  },
  addressContainer: {
    borderWidth: 2,
    borderRadius: 12,
    padding: 12,
    borderColor: theme.colors.outline,
  },
  copyButtonContainer: {
    alignSelf: "center",
    width: "75%",
  },
  addressText: {
    color: theme.colors.secondary,
  },
});
