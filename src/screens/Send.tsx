import type { Types } from "aptos";
import { BCS, TxnBuilderTypes } from "aptos";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

import { Alert } from "../components";
import { AccountContext } from "../context/AccountContext";
import { UIContext } from "../context/UIContext";
import { Web3Context } from "../context/Web3Context";
import { parseError } from "../core/error";
import { getRouteParams } from "../core/navigation";
import { valueToString } from "../core/values";
import type { RootStackScreenProps } from "../Routes";
import { baseline, theme } from "../theme";

interface Payload {
  address: string;
  type: string;
  amount: number;
}

const makePayload = async ({
  address,
  type,
  amount,
}: Payload): Promise<TxnBuilderTypes.TransactionPayloadEntryFunction> => {
  const token = new TxnBuilderTypes.TypeTagStruct(TxnBuilderTypes.StructTag.fromString(type));
  return new TxnBuilderTypes.TransactionPayloadEntryFunction(
    TxnBuilderTypes.EntryFunction.natural(
      "0x1::coin",
      "transfer",
      [token],
      [BCS.bcsToBytes(TxnBuilderTypes.AccountAddress.fromHex(address)), BCS.bcsSerializeUint64(amount)]
    )
  );
};

export const Send = ({ navigation }: RootStackScreenProps<"Send">) => {
  const { sendAlert } = useContext(UIContext);
  const { web3 } = useContext(Web3Context);
  const { account } = useContext(AccountContext);

  const [asset, setAsset] = useState<Coin | undefined>(undefined);

  const [recipient, setRecipient] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [maxGasAmount, setMaxGasAmount] = useState<string>("25000");

  const [validTransaction, setValidTransaction] = useState<boolean>(false);
  const [simulationError, setSimulationError] = useState<boolean>(false);

  const [isLocalLoading, setIsLocalLoading] = useState<boolean>(false);

  const gasUnitPrice = "100";

  useEffect(() => {
    const data = getRouteParams(navigation) as AssetScreenProps;
    setAsset(data.assetInfo);
  }, [navigation]);

  useEffect(() => {
    setValidTransaction(false);
    setSimulationError(false);
  }, [recipient, amount, maxGasAmount, gasUnitPrice]);

  const simulateTransaction = async (): Promise<void> => {
    setIsLocalLoading(true);
    try {
      if (account && asset) {
        const convertAmount = Number(valueToString(asset, amount.replace(",", ".")));
        const payload = await makePayload({ address: recipient, type: asset.type, amount: convertAmount });
        const result = await web3.simulateTransaction(account, payload, maxGasAmount, gasUnitPrice);

        if (result?.success) {
          setValidTransaction(true);
        } else {
          setSimulationError(true);
          sendAlert({ message: "Simulation failed" });
        }
      }
    } catch (e) {
      const error = parseError(e, "Failed to simulate transaction");
      console.log(error.message);
      setSimulationError(true);
      sendAlert({ message: "Failed to simulate transaction" });
    }
    setIsLocalLoading(false);
  };

  const submitTransaction = async (): Promise<void> => {
    setIsLocalLoading(true);
    try {
      if (account && asset) {
        const convertAmount = Number(valueToString(asset, amount.replace(",", ".")));
        const payload = await makePayload({ address: recipient, type: asset.type, amount: convertAmount });
        const result = (await web3.submitTransaction(
          account,
          payload,
          maxGasAmount,
          gasUnitPrice
        )) as Types.Transaction_UserTransaction;
        console.log(JSON.stringify(result?.vm_status, null, 2));

        if (result?.success) {
          navigation.goBack();
          sendAlert({ message: "Transaction successfully sent" });
        } else {
          sendAlert({ message: "Transaction failed" });
        }
      }
    } catch (e) {
      setSimulationError(true);
      sendAlert({ message: "Failed to submit transaction" });
    }
    setIsLocalLoading(false);
  };

  const handleEdit = () => {
    setValidTransaction(false);
    setSimulationError(false);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={baseline.baseContainer}>
          <View style={baseline.marginRegularBottom}>
            <Text variant="titleMedium" style={styles.textFieldLabel}>
              Address
            </Text>
            <TextInput
              mode="outlined"
              multiline={true}
              style={styles.addressInput}
              disabled={validTransaction ? true : false}
              value={recipient}
              onChangeText={(input) => setRecipient(input)}
            />
          </View>
          <View style={[baseline.marginRegularBottom, styles.inputContainer]}>
            <View style={styles.amountInput}>
              <Text variant="titleMedium" style={styles.textFieldLabel}>
                Amount {asset?.data.symbol}
              </Text>
              <TextInput
                mode="outlined"
                keyboardType="numeric"
                multiline={false}
                numberOfLines={1}
                disabled={validTransaction ? true : false}
                value={amount}
                onChangeText={(input) => setAmount(input)}
              />
            </View>
            <View style={styles.maxGasInput}>
              <Text variant="titleMedium" style={styles.textFieldLabel}>
                Max Gas
              </Text>
              <TextInput
                mode="outlined"
                keyboardType="number-pad"
                multiline={false}
                numberOfLines={1}
                disabled={validTransaction ? true : false}
                value={maxGasAmount}
                onChangeText={(input) => setMaxGasAmount(input)}
              />
            </View>
          </View>
          <View style={baseline.marginRegularTop}>
            {!validTransaction && (
              <Button mode="contained" disabled={simulationError ? true : false} onPress={() => simulateTransaction()}>
                {simulationError ? "Simulation Failed" : "Estimate"}
              </Button>
            )}
            {validTransaction && (
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <Button mode="outlined" onPress={handleEdit}>
                    Edit
                  </Button>
                </View>
                <View style={styles.button}>
                  <Button mode="contained" loading={isLocalLoading} onPress={submitTransaction}>
                    Send
                  </Button>
                </View>
              </View>
            )}
          </View>
        </View>
        <Alert />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addressInput: {
    height: 100,
    maxHeight: 125,
  },
  amountInput: {
    width: "58%",
  },
  maxGasInput: {
    width: "38%",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textFieldLabel: {
    color: theme.colors.secondary,
  },
  button: {
    width: "45%",
  },
});
