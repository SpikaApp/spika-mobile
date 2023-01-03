/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Pressable, StyleSheet, View } from "react-native";

import { AssetCard } from "../components";
import { aptosCoin } from "../core/coin";
import { TEST_ADDRESS } from "../core/constants";
import type { RootStackScreenProps } from "../Routes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

const assets = [aptosCoin];

export const Home = ({ navigation }: RootStackScreenProps<"Home">) => {
  return (
    <View style={styles.container}>
      {assets.map((asset, index) => (
        <Pressable
          key={asset!.type}
          onPress={() => {
            navigation.navigate("Asset", { displayName: asset.data.name, assetInfo: asset });
          }}
        >
          <View style={{ marginBottom: assets.length !== index ? 12 : 0 }}>
            <AssetCard address={TEST_ADDRESS} asset={asset!} currency="usd" />
          </View>
        </Pressable>
      ))}
    </View>
  );
};
