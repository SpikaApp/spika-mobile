import * as SecureStore from "expo-secure-store";

import { storeKeys } from "./constants";

export const storePassword = async (password: string): Promise<void> => {
  await SecureStore.setItemAsync(storeKeys.password, password);
};

export const getPassword = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(storeKeys.password);
};
