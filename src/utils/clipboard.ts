import * as Clipboard from "expo-clipboard";

export const copyTextToClipboard = async (str: string): Promise<void> => {
  await Clipboard.setStringAsync(str);
};

export const getClipboardText = async (): Promise<string> => {
  return await Clipboard.getStringAsync();
};
