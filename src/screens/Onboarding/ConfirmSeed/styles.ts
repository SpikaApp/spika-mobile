import { StyleSheet } from "react-native";

import { theme } from "../../../theme";

export const styles = StyleSheet.create({
  displayContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 12,
    height: 200,
    borderRadius: theme.roundness,
    borderWidth: 2,
    borderColor: theme.colors.outline,
  },
  infoTextContainer: {
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    height: "100%",
  },
  wordEnteredChip: { margin: 6, backgroundColor: theme.colors.surface },
  wordSuggestionWrapper: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
    height: 35,
  },
  inputTextWrapper: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  inputTextContainer: {
    width: "70%",
    height: "100%",
  },
  textInput: {
    marginBottom: 6,
  },
});
