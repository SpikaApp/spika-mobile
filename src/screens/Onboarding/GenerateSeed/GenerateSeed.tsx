import { generateMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Surface, Text } from "react-native-paper";

import { Checkbox } from "../../../components/Base/Checkbox";
import { normalizeMnemonic } from "../../../core/mnemonic";
import type { RootStackScreenProps } from "../../../Routes";
import { baseline } from "../../../theme";
import { copyTextToClipboard } from "../../../utils/clipboard";
import { sleep } from "../../../utils/sleep";

import { styles } from "./styles";

export const GenerateSeed = ({ navigation }: RootStackScreenProps<"GenerateSeed">) => {
  const [checkedRevealWords, setCheckedRevealWords] = useState<boolean>(false);
  const [mnemonic, setMnemonic] = useState<string>("");
  const [mnemonicObject, setMnemonicObject] = useState<Array<MnemonicWord>>([]);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const _mnemonic = generateMnemonic(wordlist);
    setMnemonic(_mnemonic);
    setMnemonicObject(normalizeMnemonic(_mnemonic));
  }, []);

  useEffect(() => {
    if (copied) {
      resetCopyButton();
    }
  }, [copied]);

  const resetCopyButton = async () => {
    await sleep(3000);
    setCopied(false);
  };

  const handleCheckboxPress = (): void => {
    setCheckedRevealWords((prev) => {
      return !prev;
    });
  };

  const handleCopyToClipboard = async () => {
    await copyTextToClipboard(mnemonic);
    setCopied(true);
  };

  return (
    <View style={baseline.baseContainer}>
      <View>
        <Surface elevation={1} style={styles.infoTextContainer}>
          <Text variant="titleSmall">
            This is your 12 words secret recovery phrase. Never share it with anyone! Spika support team will never ask
            for your recovery phrase.
          </Text>
        </Surface>
      </View>
      <View style={[styles.mnemonicContainer, baseline.marginRegularVertical]}>
        {mnemonicObject.length > 0 &&
          mnemonicObject.map((word) => (
            <View key={word.index} style={styles.mnemonicCardContainer}>
              <Surface style={styles.mnemonicCard}>
                <View style={styles.wordIndexWrapper}>
                  <Text variant="titleMedium">{word.index + 1}.</Text>
                </View>
                <View style={styles.wordValueWrapper}>
                  <Text variant="titleMedium">{checkedRevealWords ? word.value : "* * * * *"}</Text>
                </View>
              </Surface>
            </View>
          ))}
      </View>
      <View style={[styles.copyButtonWrapper, baseline.marginRegularBottom]}>
        <View style={styles.copyButtonContainer}>
          <Button icon={copied ? "check" : "copy"} mode="outlined" onPress={handleCopyToClipboard}>
            {copied ? "Copied!" : "Copy to clipboard"}
          </Button>
        </View>
      </View>
      <View style={styles.actionContainer}>
        <Surface style={[baseline.checkboxListContainer, baseline.marginExtendedBottom]}>
          <View style={baseline.checkboxItemContainer}>
            <Checkbox
              onPress={() => handleCheckboxPress()}
              checked={checkedRevealWords}
              text="Reveal words"
              size="medium"
              position="flex-start"
            />
          </View>
        </Surface>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() =>
              navigation.navigate("ConfirmSeed", { displayName: "Confirm Recovery Phrase", mnemonic: mnemonic })
            }
          >
            Continue
          </Button>
        </View>
      </View>
    </View>
  );
};
