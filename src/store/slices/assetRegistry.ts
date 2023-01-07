import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { aptosCoin } from "../../core/coin";

export interface AssetRegistryState {
  data: Array<AssetRecord>;
}

interface AssetRecord {
  hdPath: number;
  current: Coin;
  assets: Array<Coin>;
}

const initialState: AssetRegistryState = {
  data: [{ hdPath: 0, current: aptosCoin, assets: [] }],
};

export const assetRegistry = createSlice({
  name: "assetRegistry",
  initialState,
  reducers: {
    setCurrentAsset: (state, action: PayloadAction<{ hdPath: number; asset: Coin }>) => {
      const data = state.data.find((i) => i.hdPath === action.payload.hdPath);
      if (data) {
        const record: AssetRecord = {
          hdPath: data.hdPath,
          current: action.payload.asset,
          assets: data.assets,
        };
        const result = state.data.filter((i) => i.hdPath !== action.payload.hdPath);
        result.push(record);
        result.sort((a: AssetRecord, b: AssetRecord) => a.hdPath - b.hdPath);
        state.data = result;
      }
    },
    setAssets: (state, action: PayloadAction<{ hdPath: number; assets: Array<Coin> }>) => {
      const data = state.data.find((i) => i.hdPath === action.payload.hdPath);
      if (data) {
        const record: AssetRecord = {
          hdPath: data.hdPath,
          current: data.current,
          assets: action.payload.assets,
        };
        const result = state.data.filter((i) => i.hdPath !== action.payload.hdPath);
        result.push(record);
        result.sort((a: AssetRecord, b: AssetRecord) => a.hdPath - b.hdPath);
        state.data = result;
      }
    },
  },
});

export const { setCurrentAsset, setAssets } = assetRegistry.actions;
