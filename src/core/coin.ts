import { apt } from "../assets/logos.json";
import _coinlist from "../assets/coinlist.json";

export const aptosCoin: Coin = {
  type: "0x1::aptos_coin::AptosCoin",
  data: {
    contract: "0x1",
    name: "Aptos Coin",
    symbol: "APT",
    decimals: 8,
    logo: apt,
    coingecko_id: "aptos",
  },
};

export const coinlist: Array<Coin> = [aptosCoin, ..._coinlist];
