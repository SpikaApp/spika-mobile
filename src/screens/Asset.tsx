import { StyleSheet, View } from "react-native";

import type { RootStackScreenProps } from "../Routes";

export const Asset = ({ navigation }: RootStackScreenProps<"Asset">) => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
