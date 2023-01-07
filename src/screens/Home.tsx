import { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { useSelector } from "react-redux";

import { AssetCard, Alert } from "../components";
import { ReceiveDialog } from "../components/Dialogs";
import { AccountContext } from "../context/AccountContext";
import type { RootStackScreenProps } from "../Routes";
import type { RootState } from "../store";
import { baseline } from "../theme";
import { shortenAddress } from "../utils/shortenAddress";

export const Home = ({ navigation }: RootStackScreenProps<"Home">) => {
  const { account } = useContext(AccountContext);

  const [asset, setAsset] = useState<Coin | undefined>(undefined);
  const [openReceiveDialog, setOpenReceiveDialog] = useState<boolean>(false);

  const currentAccount = useSelector((state: RootState) => state.accountRegistry.current);
  const currentNetwork = useSelector((state: RootState) => state.networkRegistry.current);
  const assetRegistry = useSelector((state: RootState) => state.assetRegistry.data);
  const currency = useSelector((state: RootState) => state.configRegistry.currency);

  useEffect(() => {
    const getCurrentAsset = (hdPath: number) => {
      const data = assetRegistry.find((record) => record.hdPath === hdPath);
      return data?.current;
    };
    if (account) {
      const _asset = getCurrentAsset(currentAccount.hdPath);
      if (_asset) {
        setAsset(_asset);
      }
    }
  }, [account, assetRegistry, currentAccount.hdPath]);

  const handleOpenReceiveDialog = () => {
    setOpenReceiveDialog(true);
  };

  return (
    <>
      {account && asset && (
        <View style={styles.container}>
          <View style={baseline.baseContainer}>
            <View style={baseline.marginRegularBottom}>
              <Text variant="titleMedium">Account: {currentAccount.name}</Text>
              <Text variant="titleMedium">Address: {shortenAddress(account.address().hex())}</Text>
              <Text variant="titleMedium">Network: {currentNetwork.name}</Text>
            </View>
            <Pressable
              onPress={() => {
                navigation.navigate("Asset", { displayName: asset.data.name, assetInfo: asset });
              }}
            >
              <AssetCard address={account.address().hex()} asset={asset} currency={currency} />
            </Pressable>

            <View style={[styles.buttonContainer, baseline.marginRegularTop]}>
              <Button
                mode="outlined"
                onPress={() =>
                  navigation.navigate("Send", { displayName: `Send ${asset.data.symbol}`, assetInfo: asset })
                }
              >
                Send
              </Button>
              <Button mode="outlined">Swap</Button>
              <Button mode="outlined" onPress={handleOpenReceiveDialog}>
                Receive
              </Button>
            </View>
          </View>
          <Alert />
          <ReceiveDialog open={openReceiveDialog} setOpen={setOpenReceiveDialog} address={account.address().hex()} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
