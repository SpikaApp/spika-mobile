import { aptosCoin } from "./coin";

export const stringToValue = (asset: Coin, value: string): string => {
  const decimal: number = asset.data.decimals;
  const setDecimal = `${value}e-${decimal}`;
  return parseFloat(setDecimal)
    .toFixed(asset.data.decimals)
    .replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/, "$1");
};

export const valueToString = (asset: Coin, value: string): string => {
  const decimal: number = asset.data.decimals;
  const setDecimal = `${value}e${decimal}`;
  return Number(setDecimal).toString();
};

export const gasToValue = (gasAmount: string, gasPrice: string): string => {
  const decimal: number = aptosCoin.data.decimals;
  const setDecimal = `${Number(gasAmount) * Number(gasPrice)}e-${decimal}`;
  return Number(setDecimal).toString();
};
