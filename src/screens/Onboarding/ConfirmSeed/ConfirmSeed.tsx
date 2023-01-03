import { wordlist } from "@scure/bip39/wordlists/english";
import { useEffect, useState } from "react";
import { View } from "react-native";
import Dialog from "react-native-dialog";
import { Chip, Text, TextInput } from "react-native-paper";

import { createEmptyMnemonicObject, mnemonicToString, normalizeMnemonic } from "../../../core/mnemonic";
import type { RootStackScreenProps } from "../../../Routes";
import { baseline } from "../../../theme";
import { shuffle } from "../../../utils/shuffle";

import { styles } from "./styles";

export const ConfirmSeed = ({ navigation }: RootStackScreenProps<"ConfirmSeed">) => {
  const [mnemonic] = useState<string>(() => {
    const { index } = navigation.getState();
    const route = navigation.getState().routes[index];
    const props = route?.params as ConfirmSeedScreenProps;
    return props.mnemonic;
  });
  const [userConfirmedMnemonic, setUserConfirmedMnemonic] = useState<Array<MnemonicWord>>(createEmptyMnemonicObject());
  const [currentWord, setCurrentWord] = useState<MnemonicWord>({ index: 0, value: "" });
  const [searchResult, setSearchResult] = useState<Array<string>>([]);
  const [allWordsComplete, setAllWordsComplete] = useState<boolean>(false);
  const [mnemonicError, setMnemonicError] = useState<boolean>(false);
  const [mnemonicValidated, setMnemonicValidated] = useState<boolean>(false);

  useEffect(() => {
    const search = (searchStr: string) => {
      const data: Array<string> = [];
      const correctWord = normalizeMnemonic(mnemonic).find((word) => word.index === currentWord.index);

      wordlist.filter((word) => {
        const match = word.startsWith(searchStr);

        if (match) {
          data.push(word);
        }
      });

      shuffle(data);

      let result: Array<string> = [];

      if (data.length > 3) {
        result = data.slice(0, 3);
      } else {
        result = data;
      }

      if (correctWord && result.find((word) => word === correctWord.value)) {
        return result;
      } else if (correctWord && correctWord.value.startsWith(searchStr)) {
        result = result.slice(0, 2);
        result.push(correctWord.value);
      }

      shuffle(result);

      if (searchStr.length > 0) {
        setSearchResult(result);
      } else {
        return setSearchResult([]);
      }
    };

    const searchString = currentWord.value;
    search(searchString);
  }, [currentWord, mnemonic]);

  useEffect(() => {
    const data = userConfirmedMnemonic.filter((word) => word.value !== "");

    if (data.length === 12) {
      setAllWordsComplete(true);
    } else {
      setAllWordsComplete(false);
    }
  }, [userConfirmedMnemonic]);

  // Check if entered mnemonic matches with generated one.
  useEffect(() => {
    if (allWordsComplete) {
      try {
        const mnemonicString = mnemonicToString(userConfirmedMnemonic);
        if (mnemonicString === mnemonic) {
          setMnemonicError(false);
          setMnemonicValidated(true);
        } else {
          setMnemonicError(true);
          setMnemonicValidated(false);
        }
      } catch (error) {
        setMnemonicError(true);
        setMnemonicValidated(false);
      }
    }
  }, [allWordsComplete, mnemonic, userConfirmedMnemonic]);

  // We go to next screen if mnemonic was successfully validated
  useEffect(() => {
    if (mnemonicValidated) {
      navigation.navigate("InitAccount", { displayName: "Create Password", mnemonic: mnemonic });
    }
  }, [mnemonic, mnemonicValidated, navigation]);

  const handleInput = (input: string): void => {
    const completePhrase = input.split(" ");
    if (completePhrase.length === 12) {
      const pastedPhrase: Array<MnemonicWord> = [];
      completePhrase.map((word, index) => {
        const result: MnemonicWord = {
          index: index,
          value: normalizeString(word),
        };
        pastedPhrase.push(result);
      });
      pastedPhrase.sort((a: MnemonicWord, b: MnemonicWord) => a.index - b.index);
      setUserConfirmedMnemonic(pastedPhrase);
    } else {
      setCurrentWord({ index: currentWord.index, value: input.toLowerCase() });
    }
  };

  const handleAddWord = (word: string): void => {
    handleEditWord(currentWord, word);
    setCurrentWord({ index: currentWord.index + 1, value: "" });
  };

  const handleRemoveWord = (): void => {
    const _currentWord: MnemonicWord = { index: currentWord.index - 1, value: "" };
    handleEditWord(_currentWord, "");
    setCurrentWord(_currentWord);
  };

  const handleEditWord = (_word: MnemonicWord, value: string): void => {
    const data = userConfirmedMnemonic.filter((word) => word.index !== _word.index);
    const result: MnemonicWord = {
      index: _word.index,
      value: normalizeString(value),
    };
    data.push(result);
    data.sort((a: MnemonicWord, b: MnemonicWord) => a.index - b.index);
    setUserConfirmedMnemonic(data);
  };

  const normalizeString = (input: string): string => {
    return input.replace(" ", "");
  };

  const resetScreen = (): void => {
    setAllWordsComplete(false);
    setMnemonicError(false);
    setMnemonicValidated(false);
    setSearchResult([]);
    setCurrentWord({ index: 0, value: "" });
    setUserConfirmedMnemonic(createEmptyMnemonicObject());
  };

  return (
    <View style={baseline.baseContainer}>
      <View>
        <View style={styles.displayContainer}>
          {userConfirmedMnemonic[0]?.value === "" ? (
            <View style={styles.infoTextContainer}>
              <Text variant="titleMedium">
                Confirm your recovery phrase by entering all 12 words in the below field.
              </Text>
            </View>
          ) : (
            <>
              {userConfirmedMnemonic.map((word) => (
                <View key={word.index}>
                  {word.value !== "" && (
                    <>
                      {userConfirmedMnemonic[word.index + 1]?.value === "" && word.index !== 11 ? (
                        <Chip
                          style={styles.wordEnteredChip}
                          elevation={1}
                          closeIcon="x"
                          onClose={() => userConfirmedMnemonic[word.index + 1]?.value === "" && handleRemoveWord()}
                        >
                          {word.value}
                        </Chip>
                      ) : (
                        <Chip style={styles.wordEnteredChip} elevation={1}>
                          {word.value}
                        </Chip>
                      )}
                    </>
                  )}
                </View>
              ))}
            </>
          )}
        </View>
        {!mnemonicValidated && (
          <View>
            <View style={styles.wordSuggestionWrapper}>
              {searchResult.map((word) => (
                <View key={word}>
                  <Chip elevation={1} onPress={() => handleAddWord(word)}>
                    {word}
                  </Chip>
                </View>
              ))}
            </View>
            <View style={[baseline.marginRegularVertical, styles.inputTextWrapper]}>
              <View style={styles.inputTextContainer}>
                <TextInput
                  mode="outlined"
                  style={styles.textInput}
                  left={<TextInput.Affix text={`${currentWord.index + 1}/12`} />}
                  value={currentWord.value}
                  autoCapitalize="none"
                  autoFocus={true}
                  onChangeText={(input) => handleInput(input)}
                />
              </View>
            </View>
          </View>
        )}
        <Dialog.Container visible={mnemonicError}>
          <Dialog.Title>Invalid Recovery Phrase</Dialog.Title>
          <Dialog.Description>
            Unfortunately, recovery phrase provided is not valid. Please try again.
          </Dialog.Description>
          <Dialog.Button label="OK" onPress={() => resetScreen()} />
        </Dialog.Container>
      </View>
    </View>
  );
};
