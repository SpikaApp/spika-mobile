import { StyleSheet } from "react-native";

import { theme } from "../../../theme";

export const styles = StyleSheet.create({
  infoTextContainer: {
    borderRadius: theme.roundness,
    padding: 12,
  },
  mnemonicContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },

  copyButtonWrapper: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  copyButtonContainer: {
    alignSelf: "center",
    width: "60%",
  },

  actionContainer: {},
  copyIcon: {
    alignSelf: "center",
  },
  mnemonicCardContainer: {
    width: "48%",
    marginVertical: 4,
  },
  mnemonicCard: {
    padding: 8,
    flexDirection: "row",
    borderRadius: theme.roundness,
  },
  wordIndexWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: "20%",
  },
  wordValueWrapper: {
    width: "77%",
  },
  buttonContainer: { alignSelf: "center", width: "75%" },
});
