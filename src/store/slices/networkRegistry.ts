// import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface NetworkRegistryState {
  current: Network;
  registry: Array<Network>;
}

const initialState: NetworkRegistryState = {
  current: {
    name: "devnet",
    nodeUrl: "https://fullnode.devnet.aptoslabs.com/v1",
  },
  registry: [
    {
      name: "mainnet",
      nodeUrl: "https://mainnet.aptoslabs.com/v1",
    },
    {
      name: "testnet",
      nodeUrl: "https://testnet.aptoslabs.com/v1",
    },
    {
      name: "devnet",
      nodeUrl: "https://fullnode.devnet.atoslabs.com/v1",
    },
  ],
};

export const networkRegistry = createSlice({
  name: "networkRegistry",
  initialState,
  reducers: {},
});

export const {} = networkRegistry.actions;
