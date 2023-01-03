import { FontAwesome5 as Icon } from "@expo/vector-icons";
import { generateMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Divider, Surface, Text } from "react-native-paper";

import { Checkbox } from "../../../components/Base/Checkbox";
import { normalizeMnemonic } from "../../../core/mnemonic";
import type { RootStackScreenProps } from "../../../Routes";
import { baseline, theme } from "../../../theme";

import { styles } from "./styles";

type CheckedActions = "reveal" | "save";

export const GenerateSeed = ({ navigation }: RootStackScreenProps<"GenerateSeed">) => {
  const [checkedRevealWords, setCheckedRevealWords] = useState<boolean>(false);
  const [checkedMnemonicSaved, setCheckedMnemonicSaved] = useState<boolean>(false);
  const [mnemonic, setMnemonic] = useState<string>("");
  const [mnemonicObject, setMnemonicObject] = useState<Array<MnemonicWord>>([]);

  useEffect(() => {
    const _mnemonic = generateMnemonic(wordlist);
    setMnemonic(_mnemonic);
    setMnemonicObject(normalizeMnemonic(_mnemonic));
  }, []);

  const handleCheckboxPress = (action: CheckedActions) => {
    switch (action) {
      case "reveal":
        setCheckedRevealWords((prev) => {
          return !prev;
        });
        break;
      case "save":
        setCheckedMnemonicSaved((prev) => {
          return !prev;
        });
        break;
    }
  };

  return (
    <View style={baseline.baseContainer}>
      <View>
        <Surface elevation={1} style={styles.infoTextContainer}>
          <Icon
            name="info-circle"
            size={24}
            color={theme.colors.primary}
            style={[baseline.marginRegularBottom, styles.infoIcon]}
          />
          <Text variant="bodyMedium">
            This is your 12 words secret recovery phrase to restore wallet. On the next screen it will be required to
            confirm that phrase is properly saved.{" "}
            <Text variant="titleSmall">
              Never share your secret recovery phrase with anyone! Spika support team will never ask you for your
              recovery phrase.
            </Text>
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
      <View style={styles.actionContainer}>
        <Surface style={[baseline.checkboxListContainer, baseline.marginExtendedBottom]}>
          <View style={baseline.checkboxItemContainer}>
            <Checkbox
              onPress={() => handleCheckboxPress("reveal")}
              checked={checkedRevealWords}
              text="Reveal words"
              size="medium"
              position="flex-start"
            />
          </View>
          <Divider style={baseline.checkboxDividerLeft} />
          <View style={baseline.checkboxItemContainer}>
            <Checkbox
              onPress={() => handleCheckboxPress("save")}
              checked={checkedMnemonicSaved}
              text="I saved my recovery phrase"
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
            disabled={checkedRevealWords && checkedMnemonicSaved ? false : true}
          >
            Continue
          </Button>
        </View>
      </View>
    </View>
  );
};
