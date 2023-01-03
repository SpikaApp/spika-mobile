import * as aptos from "aptos";

import { client } from "./client";

export const aptosDerivePath = (i: number): string => {
  return `m/44'/637'/${i}'/0'/0'`;
};

export const coinStore = (type: string): string => {
  return `0x1::coin::CoinStore<${type}>`;
};

export const getBalance = async (address: string, type: string): Promise<string | undefined> => {
  const result: CoinStore = await client.getAccountResource(address, coinStore(type));
  return result.data.coin?.value;
};

export const getAptosAccount = (index: number, mnemonic: string): aptos.AptosAccount => {
  return aptos.AptosAccount.fromDerivePath(aptosDerivePath(index), mnemonic);
};
