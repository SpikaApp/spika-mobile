export const shortenAddress = (address: string): string =>
  `${address.slice(0, 7)}...${address.slice(address.length - 4)}`;
