import { validateMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";

export const normalizeMnemonic = (mnemonic: string): Array<MnemonicWord> => {
  const input = mnemonic.split(" ");
  const result: Array<MnemonicWord> = [];
  input.map((word, index) => {
    const data: MnemonicWord = {
      index: index,
      value: word,
    };
    result.push(data);
  });
  if (result.length === 12) {
    let test = "";
    result.map((word, index) => {
      if (index === 0) {
        test = word.value;
      } else {
        test = `${test} ${word.value}`;
      }
    });
    const validated = validateMnemonic(test, wordlist);

    if (validated) {
      return result;
    } else {
      throw new Error("Invalid mnemonic phrase");
    }
  } else {
    throw new Error("Invalid length");
  }
};

export const mnemonicToString = (mnemonic: Array<MnemonicWord>): string => {
  let result = "";
  mnemonic.map((word, index) => {
    if (index === 0) {
      result = word.value;
    } else {
      result = `${result} ${word.value}`;
    }
  });
  const validated = validateMnemonic(result, wordlist);
  if (validated) {
    return result;
  } else {
    throw new Error("Invalid mnemonic phrase");
  }
};

export const createEmptyMnemonicObject = (): Array<MnemonicWord> => {
  const result: Array<MnemonicWord> = [];
  for (let i = 0; i < 12; i++) {
    const data: MnemonicWord = {
      index: i,
      value: "",
    };
    result.push(data);
  }
  return result;
};
